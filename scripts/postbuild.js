const fs = require("fs");
const path = require("path");

/**
 * Vercel 배포 시 next-swagger-doc(및 Next 빌드) 관련 ENOENT 방지.
 * .next/export-detail.json 이 없을 때 발생하는 오류를 막기 위해 생성.
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
