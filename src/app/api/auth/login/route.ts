import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { decryptAES } from "utils/crypto";

export const dynamic = "force-dynamic";

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

      // 비밀번호 확인 (AES 복호화하여 비교)
      try {
        const decryptedPassword = decryptAES(admin.password);

        if (password !== decryptedPassword) {
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

      // 로그인 성공 - 쿠키에 인증 정보 저장
      const cookieStore = await cookies();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7일 후 만료

      cookieStore.set("admin_auth", "authenticated", {
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
