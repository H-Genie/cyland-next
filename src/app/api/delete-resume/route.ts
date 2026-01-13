import { NextResponse } from "next/server";
import { pool } from "utils/db";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (id === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM resume WHERE id = $1 RETURNING id`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Resume not found", { status: 404 });
    }

    return NextResponse.json({ id: rows[0].id });
  } catch (err: unknown) {
    console.error("이력서 삭제 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
