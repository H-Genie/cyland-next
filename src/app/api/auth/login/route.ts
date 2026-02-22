import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { decryptAES } from "utils/crypto";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 관리자 로그인
 *     description: username, password(암호화)로 로그인. 성공 시 쿠키(admin_auth, admin_username) 설정.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: "string" }
 *               password: { type: "string", description: "AES 암호화된 비밀번호" }
 *     responses:
 *       200:
 *         description: 로그인 성공 (success, username)
 *       400:
 *         description: 사용자명/비밀번호 미입력
 *       401:
 *         description: 사용자명 또는 비밀번호 불일치
 *       500:
 *         description: 인증 중 오류
 */
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "사용자명과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    try {
      // 데이터베이스에서 관리자 계정 조회
      const { rows } = await client.query(
        "SELECT id, username, password FROM admin WHERE username = $1",
        [username]
      );

      if (rows.length === 0) {
        return NextResponse.json(
          { error: "사용자명 또는 비밀번호가 올바르지 않습니다." },
          { status: 401 }
        );
      }

      const admin = rows[0];

      // 비밀번호 확인 (클라이언트에서 암호화된 비밀번호와 DB의 암호화된 비밀번호 비교)
      try {
        // 클라이언트에서 전송된 암호화된 비밀번호 복호화
        const decryptedClientPassword = decryptAES(password);
        // DB에 저장된 암호화된 비밀번호 복호화
        const decryptedDbPassword = decryptAES(admin.password);

        if (decryptedClientPassword !== decryptedDbPassword) {
          return NextResponse.json(
            { error: "사용자명 또는 비밀번호가 올바르지 않습니다." },
            { status: 401 }
          );
        }
      } catch (error) {
        console.error("Password decryption failed:", error);
        return NextResponse.json(
          { error: "인증 중 오류가 발생했습니다." },
          { status: 500 }
        );
      }

      // 로그인 성공 - 새 api_key 생성 후 DB 저장, 쿠키에 저장
      const apiKey = randomBytes(64).toString("hex");
      await client.query(
        "UPDATE admin SET api_key = $1 WHERE id = $2",
        [apiKey, admin.id]
      );

      const cookieStore = await cookies();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7일 후 만료

      cookieStore.set("admin_auth", apiKey, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
      });

      cookieStore.set("admin_username", admin.username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
      });

      return NextResponse.json({
        success: true,
        username: admin.username
      });
    } catch (error) {
      console.error("Database error during authentication:", error);
      return NextResponse.json(
        { error: "인증 중 오류가 발생했습니다." },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
