import { NextResponse } from "next/server";
import { pool } from "utils/db";

export async function POST(req: Request) {
  const { name, link, thumbnail } = await req.json();

  if (!name || !link || !thumbnail) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO portfolio (name, link, thumbnail) VALUES ($1, $2, $3)`,
      [name, link, thumbnail]
    );
    return NextResponse.json(true);
  } catch (err: unknown) {
    return NextResponse.json(false, { status: 500 });
  } finally {
    client?.release();
  }
}
