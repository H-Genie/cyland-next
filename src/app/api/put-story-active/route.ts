import { NextResponse } from "next/server";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const { id, active } = await req.json();

  if (id === undefined || active === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE story SET active = $1 WHERE id = $2 RETURNING id, active`,
      [active, id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Story not found", { status: 404 });
    }

    const response = NextResponse.json({ id: rows[0].id, active: rows[0].active });
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (err: unknown) {
    console.error("스토리 active 상태 변경 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
