import { NextResponse } from "next/server";
import { pool } from "utils/db";

export async function GET() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`
        select 
            p.id, 
            p.name, 
            p.link,
            p.thumbnail,
            v.language,
            v.description,
            v.study,
            v.range,
            v.sublink,
            v.classification,
            c.name as classification
        from portfolio p
        LEFT JOIN portfolio_visitor v ON p.id = v.portfolio_id
        LEFT JOIN classification c ON v.classification = c.classification
    `);
    return NextResponse.json(rows);
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
