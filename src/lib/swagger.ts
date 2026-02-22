import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { createSwaggerSpec } from "next-swagger-doc";

const definition = {
  openapi: "3.0.0",
  info: {
    title: "Cyland API",
    version: "1.0.0",
    description: "Next.js App Router 기반 API 문서",
  },
  security: [{ bearerAuth: [] }],
  tags: [
    { name: "Portfolio", description: "포트폴리오 API" },
    { name: "Story", description: "스토리 API" },
    { name: "Resume", description: "이력서 API" },
    { name: "Comment", description: "댓글 API" },
    { name: "Upload", description: "이미지 업로드" },
    { name: "Auth", description: "관리자 인증" },
  ],
};

/**
 * Swagger 명세 반환.
 * - 빌드 시 생성된 public/openapi.json 이 있으면 사용 (배포 환경에서 라우트가 보이도록 함).
 * - 없으면 런타임에 createSwaggerSpec 으로 생성 (로컬 개발 시).
 */
export async function getApiDocs(): Promise<Record<string, unknown>> {
  const builtPath = join(process.cwd(), "public", "openapi.json");
  if (existsSync(builtPath)) {
    const raw = readFileSync(builtPath, "utf-8");
    return JSON.parse(raw) as Record<string, unknown>;
  }
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition,
  });
  return spec as Record<string, unknown>;
}
