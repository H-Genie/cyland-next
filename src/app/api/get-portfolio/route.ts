// import { NextResponse } from "next/server";
// import { Pool } from "pg";

// const pool = new Pool({
//   connectionString: process.env.SUPABASE_DB_URL,
//   ssl: { rejectUnauthorized: false }
// });

// export async function GET() {
//   const client = await pool.connect();
//   try {
//     const { rows } = await client.query(`select * from public.portfolio`);
//     return NextResponse.json({ ok: true, items: rows });
//   } catch (error) {
//     console.error("Error fetching portfolio:", error);
//   } finally {
//     client.release();
//   }
// }

import { NextResponse } from "next/server";
import { Pool, PoolClient } from "pg";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET() {
  let client: PoolClient | undefined;

  try {
    if (!process.env.SUPABASE_DB_URL) {
      return NextResponse.json(
        { ok: false, error: "Missing SUPABASE_DB_URL" },
        { status: 500 }
      );
    }

    client = await pool.connect();

    const { rows } = await client.query(
      `select id, name, link, thumbnail
         from public.portfolio
        order by id;`
    );

    return NextResponse.json({ ok: true, items: rows });
  } catch (err: unknown) {
    // 서버 로그로는 자세히 남기고
    console.error("[get-portfolio] DB error:", err);
    // 응답은 필요한 정보만
    const e = err as { message?: string; code?: string };
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Database error", code: e?.code },
      { status: 500 }
    );
  } finally {
    client?.release();
  }
}
