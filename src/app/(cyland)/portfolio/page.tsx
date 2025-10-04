import PortfolioBody from "components/RightBody/PortfolioSection/PortfolioBody";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "프론트엔드 포트폴리오, 리액트 포트폴리오, 퍼블리싱 포트폴리오, 자바스크립트 포트폴리오, HTML 포트폴리오, CSS 포트폴리오, HTML, CSS, JavaScript, React, Node.js, Next.js"
};

export default function Portfolio() {
  return <PortfolioBody />;
}
