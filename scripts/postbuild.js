const fs = require("fs");
const path = require("path");

/**
 * Vercel 배포 시 next-swagger-doc(및 Next 빌드) 관련 ENOENT 방지.
 * next build 전에 .next/export-detail.json 을 미리 생성해 두어야 빌드가 성공함.
 * (build 스크립트에서 이 스크립트를 next build 보다 먼저 실행함)
 * @see https://github.com/jellydn/next-swagger-doc/issues/1157
 */
const exportDetailPath = path.join(process.cwd(), ".next", "export-detail.json");
const dir = path.dirname(exportDetailPath);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const content = JSON.stringify({
  version: 1,
  outDirectory: path.join(process.cwd(), ".next"),
  success: false,
});

fs.writeFileSync(exportDetailPath, content, "utf8");
