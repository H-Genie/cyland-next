import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { pool } from "utils/db";
import { getAdminFromRequest } from "utils/auth";

export async function PUT(req: Request) {
  const cookieStore = await cookies();
  const admin = await getAdminFromRequest(req, cookieStore);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, content } = await req.json();

  if (!id || content === undefined) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE resume SET content = $1 WHERE id = $2 RETURNING id, content`,
      [content, id]
    );

    if (rows.length === 0) {
      return NextResponse.json("Resume not found", { status: 404 });
    }

    return NextResponse.json({ id: rows[0].id, content: rows[0].content });
  } catch (err: unknown) {
    console.error("이력서 수정 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}

