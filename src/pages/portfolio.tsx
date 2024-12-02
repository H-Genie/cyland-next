import Head from "next/head";
import MakePortfolioCarousel from "components/RightBody/PortfolioSection/MakePortfolioCarousel";
import MakePortfolioVisitor from "components/RightBody/PortfolioSection/MakePortfolioVisitor";
import { Route } from "components/RightBody/Route";
import Visitor from "components/RightBody/Visitor";
import { portfoilioVisitor } from "constants/portfolios";

export default function Portfolio() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="프론트엔드 포트폴리오, 리액트 포트폴리오, 퍼블리싱 포트폴리오, 자바스크립트 포트폴리오, HTML 포트폴리오, CSS 포트폴리오, HTML, CSS, JavaScript, React, Node.js, Next.js"
        />
        <title>Portfolio</title>
      </Head>
      <Route>
        <Visitor
          no={0}
          contents={
            <>
              <p>
                풀스택 프로젝트 1개, 프론트엔드 프로젝트 3개, 퍼블리싱 프로젝트
                5개, 실무 1개
              </p>
              <br />
              <p style={{ fontSize: 12 }}>
                (일부 포트폴리오는 server sleep으로 인해 접속시간이 오래 걸릴수
                있으니 양해바랍니다)
              </p>
              <br />
              <MakePortfolioCarousel />
            </>
          }
          notice={true}
        />
        {portfoilioVisitor.map((visitor, index) => (
          <Visitor
            key={index + 1}
            no={index + 1}
            contents={<MakePortfolioVisitor data={{ ...visitor }} />}
          />
        ))}
      </Route>
    </>
  );
}
