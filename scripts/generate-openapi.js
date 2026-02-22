const path = require("path");
const fs = require("fs");
const { createSwaggerSpec } = require("next-swagger-doc");

/**
 * 빌드 시점에 OpenAPI 스펙을 생성해 public/openapi.json 으로 저장.
 * Vercel 등 배포 환경에서는 런타임에 src/app/api 소스를 스캔할 수 없어
 * 스펙이 비어 나오므로, 빌드 시 생성한 파일을 서빙하도록 함.
 */
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

const spec = createSwaggerSpec({
  apiFolder: "src/app/api",
  definition,
});

const outPath = path.join(process.cwd(), "public", "openapi.json");
const dir = path.dirname(outPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(outPath, JSON.stringify(spec, null, 2), "utf8");
console.log("Generated public/openapi.json");
