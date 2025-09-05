"use client";
import MakePortfolioCarousel from "components/RightBody/PortfolioSection/MakePortfolioCarousel";
import MakePortfolioVisitor from "components/RightBody/PortfolioSection/MakePortfolioVisitor";
import { Route } from "components/RightBody/common/Route";
import Visitor from "components/RightBody/common/Visitor";
// import { portfoilioVisitor } from "constants/portfolios";
import { usePortfolio } from "hooks/queries/usePortfolio";
import Loader from "styles/Loader";

export default function PortfolioBody() {
  const { data, isLoading, isError } = usePortfolio();

  if (isLoading) return <Loader.Basic />;
  if (isError) return <div>에러가 발생했습니다.</div>;
  return (
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
            <MakePortfolioCarousel />
          </>
        }
        notice={true}
      />
      {data.map((visitor: any, index: any) => (
        <Visitor
          key={index + 1}
          no={index + 1}
          contents={<MakePortfolioVisitor data={{ ...visitor }} />}
        />
      ))}
    </Route>
  );
}
