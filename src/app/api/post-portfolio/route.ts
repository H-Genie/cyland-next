import { NextResponse } from "next/server";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const {
    name,
    link,
    thumbnail,
    thumbnail_delete_url,
    order,
    classification,
    language,
    description,
    study,
    range,
    sublink,
    active
  } = await req.json();

  if (!name || !link || !thumbnail) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    // sublink를 JSON 문자열로 변환
    const sublinkJson = sublink ? JSON.stringify(sublink) : null;

    const { rows } = await client.query(
      `INSERT INTO portfolio 
       (name, link, thumbnail, thumbnail_delete_url, "order", classification, language, description, study, range, sublink, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING id, name, link, thumbnail, thumbnail_delete_url, "order", classification, language, 
                 description, study, range, sublink, active`,
      [
        name,
        link,
        thumbnail,
        thumbnail_delete_url || null,
        order != null ? Number(order) : null,
        classification || null,
        language || null,
        description || null,
        study || null,
        range || null,
        sublinkJson,
        active !== undefined ? active : true
      ]
    );

    // sublink를 객체로 변환하여 반환
    const portfolio = rows[0];
    if (portfolio.sublink && typeof portfolio.sublink === "string") {
      portfolio.sublink = JSON.parse(portfolio.sublink);
    }

    const response = NextResponse.json(portfolio);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  } catch (err: unknown) {
    console.error("포트폴리오 생성 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
