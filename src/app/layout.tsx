import { Metadata } from "next";
import Providers from "../components/Providers";

export const metadata: Metadata = {
  title: "H-Genie.com",
  description:
    "서형진 포트폴리오, H-Genie.com, 프론트엔드 개발자, frontend developer, 프론트엔드 포트폴리오, frontend portfolio, 리액트 포트폴리오, react portfolio",
  authors: [{ name: "서형진" }],
  metadataBase: new URL("https://h-genie.com"),
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
    google: process.env.GOOGLE_VERIFICATION as string,
    other: {
      naver: process.env.NAVER_VERIFICATION as string
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
