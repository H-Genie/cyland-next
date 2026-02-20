import { pool } from "utils/db";

interface CookieStore {
  get(name: string): { value: string } | undefined;
}

/** api_key로 관리자 조회. 없거나 만료된 키면 null */
export async function getAdminByApiKey(
  apiKey: string | undefined
): Promise<{ id: number; username: string } | null> {
  if (!apiKey || typeof apiKey !== "string" || apiKey.length < 64) {
    return null;
  }
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'SELECT id, username FROM admin WHERE api_key = $1',
      [apiKey.trim()]
    );
    return rows.length > 0 ? rows[0] : null;
  } finally {
    client.release();
  }
}

/** Request에서 api_key 추출 (Authorization: Bearer 우선, 없으면 admin_auth 쿠키) */
function getApiKeyFromRequest(req: Request, cookieStore: CookieStore): string | undefined {
  const auth = req.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7).trim() || undefined;
  }
  return cookieStore.get("admin_auth")?.value;
}

/** Bearer 또는 쿠키의 api_key로 관리자 검증. 없거나 유효하지 않으면 null */
export async function getAdminFromRequest(
  req: Request,
  cookieStore: CookieStore
): Promise<{ id: number; username: string } | null> {
  const apiKey = getApiKeyFromRequest(req, cookieStore);
  return getAdminByApiKey(apiKey);
}
