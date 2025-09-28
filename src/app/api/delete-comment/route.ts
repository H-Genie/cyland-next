import { NextResponse } from "next/server";
import { decryptAES } from "utils/crypto";
import { pool } from "utils/db";

export async function DELETE(req: Request) {
  const { id, password } = await req.json();

  if (!id || !password) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const decryptedPassword = decryptAES(password);
    const { rows } = await client.query(
      `SELECT (password = $2) as password_match FROM comment WHERE id = $1`,
      [id, decryptedPassword]
    );

    if (!rows[0].password_match)
      return NextResponse.json("Invalid password", { status: 401 });

    await client.query(`DELETE FROM comment WHERE id = $1`, [id]);

    return NextResponse.json(true);
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
