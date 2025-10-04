import React, { useState } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "./SectionHeader";
import DataTable, { TableColumn, TableAction } from "./DataTable";

export interface Portfolio {
  id: number;
  title: string;
  category: string;
  status: boolean;
}

interface PortfolioSectionProps {
  initialPortfolios: Portfolio[];
  onDataChange?: (portfolios: Portfolio[]) => void;
}

export default function PortfolioSection({
  initialPortfolios,
  onDataChange
}: PortfolioSectionProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(initialPortfolios);

  const handleAdd = () => {
    console.log("포트폴리오 추가");
    // TODO: 포트폴리오 추가 로직
    // const newPortfolio = await api.createPortfolio();
    // const newPortfolios = [...portfolios, newPortfolio];
    // setPortfolios(newPortfolios);
    // onDataChange?.(newPortfolios);
  };

  const handleEdit = (portfolio: Portfolio) => {
    console.log("포트폴리오 수정:", portfolio);
    // TODO: 포트폴리오 수정 로직
    // const updatedPortfolio = await api.updatePortfolio(portfolio);
    // const newPortfolios = portfolios.map(p => p.id === portfolio.id ? updatedPortfolio : p);
    // setPortfolios(newPortfolios);
    // onDataChange?.(newPortfolios);
  };

  const handleDelete = (portfolio: Portfolio) => {
    console.log("포트폴리오 삭제:", portfolio);
    // TODO: 포트폴리오 삭제 로직
    // await api.deletePortfolio(portfolio.id);
    // const newPortfolios = portfolios.filter(p => p.id !== portfolio.id);
    // setPortfolios(newPortfolios);
    // onDataChange?.(newPortfolios);
  };
  const columns: TableColumn[] = [
    { key: "id", label: "ID", width: "80px" },
    { key: "title", label: "제목" },
    { key: "category", label: "분류", width: "120px" },
    { key: "status", label: "상태", width: "100px" }
  ];

  const actions: TableAction[] = [
    {
      label: "수정",
      type: "edit",
      onClick: portfolio => handleEdit(portfolio)
    },
    {
      label: "삭제",
      type: "delete",
      onClick: portfolio => handleDelete(portfolio)
    }
  ];

  return (
    <Style.PortfolioSection>
      <SectionHeader
        title="포트폴리오 관리"
        showAddButton={true}
        addButtonText="새 포트폴리오 추가"
        onAddClick={handleAdd}
      />
      <DataTable
        columns={columns}
        data={portfolios}
        actions={actions}
        statusColumn={{
          key: "status",
          activeValue: true,
          inactiveValue: false
        }}
      />
    </Style.PortfolioSection>
  );
}
