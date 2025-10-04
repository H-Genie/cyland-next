import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "관리자 페이지"
};

export default function Admin() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>관리자 페이지</h1>
      <p>이 페이지는 헤더/푸터 등 크롬의 영향을 받지 않습니다.</p>
    </div>
  );
}
