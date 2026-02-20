import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptAES } from "utils/crypto";
import { pool } from "utils/db";
import { getAdminByApiKey } from "utils/auth";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  const { id, password } = await req.json();

  if (!id) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const cookieStore = await cookies();
  const apiKey = cookieStore.get("admin_auth")?.value;
  const admin = await getAdminByApiKey(apiKey);
  const isAdmin = !!admin;

  if (apiKey && !admin) {
    cookieStore.delete("admin_auth");
    cookieStore.delete("admin_username");
  }

  if (!isAdmin && !password) {
    return NextResponse.json("Password required", { status: 400 });
  }

  const client = await pool.connect();
  try {
    // 관리자가 아닌 경우에만 비밀번호 검증
    if (!isAdmin) {
      if (!password) {
        return NextResponse.json("Password required", { status: 400 });
      }

      const decryptedPassword = decryptAES(password);
      const { rows } = await client.query(
        `SELECT (password = $2) as password_match FROM comment WHERE id = $1`,
        [id, decryptedPassword]
      );

      if (!rows[0]?.password_match) {
        return NextResponse.json("Invalid password", { status: 401 });
      }
    }

    await client.query(`DELETE FROM comment WHERE id = $1`, [id]);

    const response = NextResponse.json(true);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
