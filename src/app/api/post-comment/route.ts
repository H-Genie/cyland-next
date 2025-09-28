import { NextResponse } from "next/server";
import { decryptAES } from "utils/crypto";
import { pool } from "utils/db";

export async function POST(req: Request) {
  const { comment, nickname, password } = await req.json();

  if (!comment || !nickname || !password) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO comment (comment, nickname, password) VALUES ($1, $2, $3)`,
      [comment, nickname, decryptAES(password)]
    );
    return NextResponse.json(true);
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
