import React, { useState, useEffect } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "../shared/SectionHeader";
import DataTable, { TableColumn, TableAction } from "../shared/DataTable";
import { usePortfolio } from "../../../hooks/queries/usePortfolio";
import { usePortfolioToggleActive } from "../../../hooks/queries/usePortfolioToggleActive";
import { usePortfolioDelete } from "../../../hooks/queries/usePortfolioDelete";
import { usePortfolioUpdate } from "../../../hooks/queries/usePortfolioUpdate";
import { usePortfolioCreate } from "../../../hooks/queries/usePortfolioCreate";
import PortfolioEditModal from "../shared/PortfolioEditModal";

export interface Portfolio {
  id?: number | string;
  name?: string;
  link?: string;
  thumbnail?: string;
  /** imgBB 업로드 시 응답의 data.delete_url (이미지 삭제용) */
  thumbnail_delete_url?: string;
  classification?: string;
  language?: string;
  description?: string;
  study?: string;
  range?: string;
  sublink?: { [key: string]: string };
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
  const toggleActiveMutation = usePortfolioToggleActive();
  const deletePortfolioMutation = usePortfolioDelete();
  const updatePortfolioMutation = usePortfolioUpdate();
  const createPortfolioMutation = usePortfolioCreate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>(initialPortfolios || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [isNewPortfolio, setIsNewPortfolio] = useState(false);

  // API에서 데이터를 가져오면 상태 업데이트
  useEffect(() => {
    if (apiPortfolios && Array.isArray(apiPortfolios)) {
      setPortfolios(apiPortfolios);
    }
  }, [apiPortfolios]);

  const handleAdd = () => {
    setIsNewPortfolio(true);
    setSelectedPortfolio(null);
    setIsModalOpen(true);
  };

  const handleEdit = (portfolio: Portfolio) => {
    setIsNewPortfolio(false);
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
  };

  const handleSave = async (portfolioData: Portfolio) => {
    if (!portfolioData.name || !portfolioData.link || !portfolioData.thumbnail) {
      alert("이름, 링크, 썸네일은 필수입니다.");
      return;
    }

    try {
      if (isNewPortfolio) {
        // 새 포트폴리오 생성
        const newPortfolio = await createPortfolioMutation.mutateAsync({
          name: portfolioData.name,
          link: portfolioData.link,
          thumbnail: portfolioData.thumbnail,
          thumbnail_delete_url: portfolioData.thumbnail_delete_url || undefined,
          classification: portfolioData.classification || "1",
          language: portfolioData.language || "",
          description: portfolioData.description || "",
          study: portfolioData.study || "",
          range: portfolioData.range || "",
          sublink: portfolioData.sublink || {},
          active: portfolioData.active !== undefined ? portfolioData.active : true
        });

        // 로컬 상태 업데이트
        const newPortfolios = [...portfolios, newPortfolio];
        setPortfolios(newPortfolios);
        onDataChange?.(newPortfolios);
        alert("포트폴리오가 성공적으로 생성되었습니다.");
      } else {
        // 기존 포트폴리오 수정
        if (!portfolioData.id) {
          alert("포트폴리오 ID가 없습니다.");
          return;
        }

        const updatedPortfolio = await updatePortfolioMutation.mutateAsync({
          id: typeof portfolioData.id === "string" ? parseInt(portfolioData.id) : portfolioData.id,
          name: portfolioData.name,
          link: portfolioData.link,
          thumbnail: portfolioData.thumbnail,
          thumbnail_delete_url: portfolioData.thumbnail_delete_url || undefined,
          classification: portfolioData.classification || "1",
          language: portfolioData.language || "",
          description: portfolioData.description || "",
          study: portfolioData.study || "",
          range: portfolioData.range || "",
          sublink: portfolioData.sublink || {},
          active: portfolioData.active !== undefined ? portfolioData.active : true
        });

        // 로컬 상태 업데이트
        const newPortfolios = portfolios.map(p =>
          p.id === portfolioData.id ? { ...updatedPortfolio, classification_label: p.classification_label } : p
        );
        setPortfolios(newPortfolios);
        onDataChange?.(newPortfolios);
        alert("포트폴리오가 성공적으로 수정되었습니다.");
      }

      setIsModalOpen(false);
      setIsNewPortfolio(false);
    } catch (error) {
      console.error("포트폴리오 저장 실패:", error);
      alert("포트폴리오 저장에 실패했습니다.");
    }
  };

  const handleToggleActive = async (portfolio: Portfolio) => {
    if (!portfolio.id) {
      alert("ID가 없습니다.");
      return;
    }

    try {
      const newActive = !portfolio.active;
      await toggleActiveMutation.mutateAsync({
        id: typeof portfolio.id === "string" ? parseInt(portfolio.id) : portfolio.id,
        active: newActive
      });

      // 로컬 상태 업데이트
      const newPortfolios = portfolios.map(p =>
        p.id === portfolio.id ? { ...p, active: newActive } : p
      );
      setPortfolios(newPortfolios);
      onDataChange?.(newPortfolios);
    } catch (error) {
      console.error("포트폴리오 active 상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (portfolio: Portfolio) => {
    if (!portfolio.id) {
      alert("ID가 없습니다.");
      return;
    }

    if (!confirm("정말로 이 포트폴리오를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deletePortfolioMutation.mutateAsync({
        id: typeof portfolio.id === "string" ? parseInt(portfolio.id) : portfolio.id
      });

      // 로컬 상태 업데이트
      const newPortfolios = portfolios.filter(p => p.id !== portfolio.id);
      setPortfolios(newPortfolios);
      onDataChange?.(newPortfolios);

      alert("포트폴리오가 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("포트폴리오 삭제 실패:", error);
      alert("포트폴리오 삭제에 실패했습니다.");
    }
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
          inactiveValue: false,
          onClick: portfolio => handleToggleActive(portfolio)
        }}
      />
      <PortfolioEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsNewPortfolio(false);
        }}
        portfolio={selectedPortfolio}
        onSave={handleSave}
        isNew={isNewPortfolio}
      />
    </Style.PortfolioSection>
  );
}
