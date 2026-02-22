import { createSwaggerSpec } from "next-swagger-doc";

/**
 * Swagger 명세 생성 (next-swagger-doc).
 * API 라우트의 JSDoc @swagger 주석을 스캔해 OpenAPI 스펙을 만듦.
 */
export async function getApiDocs(): Promise<Record<string, unknown>> {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Cyland API",
        version: "1.0.0",
        description: "Next.js App Router 기반 API 문서",
      },
      // servers: [{ url: "/", description: "현재 오리진" }],
      // components: {
      //   securitySchemes: {
      //     bearerAuth: {
      //       type: "http",
      //       scheme: "bearer",
      //       bearerFormat: "JWT",
      //       description: "Bearer 토큰을 입력하세요.",
      //     },
      //   },
      // },
      security: [{ bearerAuth: [] }],
      tags: [
        { name: "Portfolio", description: "포트폴리오 API" },
        { name: "Story", description: "스토리 API" },
        { name: "Resume", description: "이력서 API" },
        { name: "Comment", description: "댓글 API" },
        { name: "Upload", description: "이미지 업로드" },
        { name: "Auth", description: "관리자 인증" },
      ],
    },
  });
  return spec as Record<string, unknown>;
}
