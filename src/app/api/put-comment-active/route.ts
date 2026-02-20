import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const cookieStore = await cookies();
  const admin = await getAdminFromRequest(req, cookieStore);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, active } = await req.json();

  if (id === undefined || active === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE comment SET active = $1 WHERE id = $2 RETURNING id, active`,
      [active, id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Comment not found", { status: 404 });
    }

    const response = NextResponse.json({ id: rows[0].id, active: rows[0].active });
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (err: unknown) {
    console.error("댓글 active 상태 변경 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
