import React, { useState, useEffect } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "../shared/SectionHeader";
import DataTable, { TableColumn, TableAction } from "../shared/DataTable";
import { usePortfolio } from "../../../hooks/queries/usePortfolio";

export interface Portfolio {
  id?: number;
  name?: string;
  title?: string;
  category?: string;
  classification?: string;
  classification_label?: string;
  status?: boolean;
  is_active?: boolean;
  active?: boolean;
}

interface PortfolioSectionProps {
  initialPortfolios?: Portfolio[];
  onDataChange?: (portfolios: Portfolio[]) => void;
}

export default function PortfolioSection({
  initialPortfolios,
  onDataChange
}: PortfolioSectionProps) {
  const { data: apiPortfolios, isLoading, isError } = usePortfolio();
  const [portfolios, setPortfolios] = useState<Portfolio[]>(initialPortfolios || []);

  // API에서 데이터를 가져오면 상태 업데이트
  useEffect(() => {
    if (apiPortfolios && Array.isArray(apiPortfolios)) {
      // is_active를 active로 매핑
      const portfoliosWithActive = apiPortfolios.map((portfolio: any) => ({
        ...portfolio,
        active: portfolio.is_active ?? portfolio.active ?? true
      }));
      setPortfolios(portfoliosWithActive);
    }
  }, [apiPortfolios]);

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
    { key: "name", label: "이름" },
    { key: "active", label: "상태", width: "100px" }
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

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <Style.PortfolioSection>
        <SectionHeader title="포트폴리오 관리" />
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>포트폴리오를 불러오는 중...</p>
        </div>
      </Style.PortfolioSection>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <Style.PortfolioSection>
        <SectionHeader title="포트폴리오 관리" />
        <div style={{ textAlign: "center", padding: "40px", color: "#dc3545" }}>
          <p>포트폴리오를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </Style.PortfolioSection>
    );
  }

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
          key: "active",
          activeValue: true,
          inactiveValue: false
        }}
      />
    </Style.PortfolioSection>
  );
}
