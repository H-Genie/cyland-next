import { NextResponse } from "next/server";
import { pool } from "utils/db";

export async function PUT(req: Request) {
  const { id, comment, nickname, password } = await req.json();
  // TODO: 인크립트 된 암호 디크립트 후 비교

  if (!id || !comment || !nickname || !password) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT (password = $2) as password_match FROM comment WHERE id = $1`,
      [id, password]
    );

    if (!rows[0].password_match)
      return NextResponse.json("Invalid password", { status: 401 });

    await client.query(
      `UPDATE comment SET comment = $1, nickname = $2 WHERE id = $3`,
      [comment, nickname, id]
    );

    return NextResponse.json({ id, comment, nickname });
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
