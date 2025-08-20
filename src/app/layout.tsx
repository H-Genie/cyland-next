import { Metadata } from "next";
import Main from "components/Main";
import GlobalStyle from "../components/GlobalStyle";

export const metadata: Metadata = {
  title: "H-Genie.com",
  description:
    "서형진 포트폴리오, H-Genie.com, 프론트엔드 개발자, frontend developer, 프론트엔드 포트폴리오, frontend portfolio, 리액트 포트폴리오, react portfolio",
  authors: [{ name: "서형진" }],
  openGraph: {
    type: "website",
    siteName: "H-Genie.com",
    url: "https://h-genie.com",
    title: "H-Genie.com",
    description:
      "프론트엔드 개발자 서형진의 포트폴리오입니다. 자바스크립트 기반의 풀스택 개발자를 목표로 끊임없이 노력중입니다",
    images: [
      {
        url: "/images/og-iamge.jpg",
        alt: "H-Genie.com open graph image"
      }
    ]
  },
  verification: {
    google: "EopT8_hzyTbvtdBH05WxfhQ8ZQRb1GJipuVdulEh7t8",
    other: {
      naver: "d37431be99e979a0e5f7cf5292765e1fb823a7ce"
    }
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <GlobalStyle />
        <Main>{children}</Main>
      </body>
    </html>
  );
}
