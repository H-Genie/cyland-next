import { NextResponse } from "next/server";
import { pool } from "utils/db";

export async function PUT(req: Request) {
  const { id, active } = await req.json();

  if (id === undefined || active === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE resume SET active = $1 WHERE id = $2 RETURNING id, active`,
      [active, id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Resume not found", { status: 404 });
    }

    return NextResponse.json({ id: rows[0].id, active: rows[0].active });
  } catch (err: unknown) {
    console.error("이력서 active 상태 변경 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}

