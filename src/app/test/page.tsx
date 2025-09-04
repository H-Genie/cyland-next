"use client";
import { usePortfolio } from "hooks/queries/usePortfolio";
import JSXParser from "react-jsx-parser";
import MakePortfolioModal from "components/RightBody/PortfolioSection/MakePortfolioModal";

export default function page() {
  const { data, isLoading, isError } = usePortfolio();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  console.log(data[9].sublink["플로우차트"]);

  return (
    <div>
      <JSXParser
        jsx={data[9].sublink["플로우차트"]}
        components={{ MakePortfolioModal: MakePortfolioModal as any }}
      />
    </div>
  );
}
