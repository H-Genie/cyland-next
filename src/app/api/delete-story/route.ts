import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  const cookieStore = await cookies();
  const admin = await getAdminFromRequest(req, cookieStore);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (id === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM story WHERE id = $1 RETURNING id`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Story not found", { status: 404 });
    }

    const response = NextResponse.json({ id: rows[0].id });
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
  } catch (err: unknown) {
    console.error("스토리 삭제 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
