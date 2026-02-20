"use client";
import MakePortfolioCarousel from "components/RightBody/PortfolioSection/MakePortfolioCarousel";
import MakePortfolioVisitor from "components/RightBody/PortfolioSection/MakePortfolioVisitor";
import { Route } from "components/RightBody/common/Route";
import Visitor from "components/RightBody/common/Visitor";
import { usePortfolio } from "hooks/queries/usePortfolio";
import Loader from "styles/Loader";
import type { Portfolio } from "types/portfolio";

export default function PortfolioBody() {
  const { data, isLoading, isError } = usePortfolio();

  if (isLoading) return <Loader.Basic />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const getClassificationCount = (classification: number) => {
    if (!data || !Array.isArray(data)) return 0;
    return data.filter((item: Portfolio) => {
      return (
        item.classification === classification.toString() &&
        item.active !== false
      );
    }).length;
  };

  const getProjectSummary = () => {
    const frontendCount = getClassificationCount(1);
    const backendCount = getClassificationCount(2);
    const fullstackCount = getClassificationCount(3);
    const publishingCount = getClassificationCount(4);
    const businessCount = getClassificationCount(5);

    const projectTypes = [
      { count: fullstackCount, label: "풀스택 프로젝트" },
      { count: frontendCount, label: "프론트엔드 프로젝트" },
      { count: publishingCount, label: "퍼블리싱 프로젝트" },
      { count: businessCount, label: "실무" },
      { count: backendCount, label: "백엔드 프로젝트" }
    ];

    const activeProjects = projectTypes.filter(project => project.count > 0);
    const summaryText = activeProjects
      .map(project => `${project.label} ${project.count}개`)
      .join(", ");

    return summaryText;
  };

  return (
    <Route>
      <Visitor
        no={0}
        contents={
          <>
            <p>{getProjectSummary()}</p>
            <br />
            <MakePortfolioCarousel
              portfolioData={data?.filter(
                (item: Portfolio) => item.active !== false
              )}
            />
          </>
        }
        notice={true}
      />
      {data
        ?.filter((item: Portfolio) => item.active !== false)
        .sort(
          (a: Portfolio, b: Portfolio) =>
            (b.order ?? -1) - (a.order ?? -1)
        )
        .map((visitor: Portfolio, index: number) => (
          <Visitor
            key={index + 1}
            no={index + 1}
            contents={<MakePortfolioVisitor data={{ ...visitor }} />}
          />
        ))}
    </Route>
  );
}
