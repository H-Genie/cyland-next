import { NextResponse } from "next/server";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`
      select
        p.*,
        c.name as classification_label
      from portfolio p
      LEFT JOIN classification c ON p.classification = c.classification
      order by p.id
      `);
    const response = NextResponse.json(rows);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (err: unknown) {
    return NextResponse.json(false, { status: 500 });
  } finally {
    client?.release();
  }
}
