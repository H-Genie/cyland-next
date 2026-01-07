import { NextResponse } from "next/server";
import { pool } from "utils/db";

export async function POST(req: Request) {
  const { content } = await req.json();

  if (content === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO story (content, active) VALUES ($1, true) RETURNING id, content, active`,
      [content]
    );

    return NextResponse.json({
      id: rows[0].id,
      content: rows[0].content,
      active: rows[0].active
    });
  } catch (err: unknown) {
    console.error("스토리 생성 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}

