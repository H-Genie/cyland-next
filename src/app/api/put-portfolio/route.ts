import { NextResponse } from "next/server";
import { pool } from "utils/db";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  const {
    id,
    name,
    link,
    thumbnail,
    thumbnail_delete_url,
    classification,
    language,
    description,
    study,
    range,
    sublink,
    active
  } = await req.json();

  if (!id || !name || !link || !thumbnail) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const client = await pool.connect();
  try {
    // sublink를 JSON 문자열로 변환
    const sublinkJson = sublink ? JSON.stringify(sublink) : null;

    const { rows } = await client.query(
      `UPDATE portfolio 
       SET name = $1, link = $2, thumbnail = $3, thumbnail_delete_url = $4, classification = $5, 
           language = $6, description = $7, study = $8, range = $9, 
           sublink = $10, active = $11
       WHERE id = $12 
       RETURNING id, name, link, thumbnail, thumbnail_delete_url, classification, language, 
                 description, study, range, sublink, active`,
      [
        name,
        link,
        thumbnail,
        thumbnail_delete_url ?? null,
        classification || null,
        language || null,
        description || null,
        study || null,
        range || null,
        sublinkJson,
        active !== undefined ? active : true,
        id
      ]
    );

    if (rows.length === 0) {
      return NextResponse.json("Portfolio not found", { status: 404 });
    }

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
    console.error("포트폴리오 수정 실패:", err);
    return NextResponse.json(err, { status: 500 });
  } finally {
    client?.release();
  }
}
