import React, { useState, useEffect } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "./SectionHeader";
import DataTable, { TableColumn, TableAction } from "./DataTable";
import { useResume } from "../../../hooks/queries/useResume";
import ResumeEditModal from "./ResumeEditModal";

export interface Resume {
  id?: number;
  content?: string;
  title?: string;
  category?: string;
  status?: boolean;
}

interface ResumeSectionProps {
  initialResumes?: Resume[];
  onDataChange?: (resumes: Resume[]) => void;
}

export default function ResumeSection({
  initialResumes,
  onDataChange
}: ResumeSectionProps) {
  const { data: apiResumes, isLoading, isError } = useResume();
  const [resumes, setResumes] = useState<Resume[]>(initialResumes || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  // API에서 데이터를 가져오면 상태 업데이트
  useEffect(() => {
    if (apiResumes && Array.isArray(apiResumes)) {
      // id가 없으면 index를 id로 사용
      const resumesWithId = apiResumes.map((resume: any, index: number) => ({
        ...resume,
        id: resume.id ?? index + 1
      }));
      setResumes(resumesWithId);
    }
  }, [apiResumes]);

  const handleAdd = () => {
    console.log("이력서 추가");
    // TODO: 이력서 추가 로직
    // const newResume = await api.createResume();
    // const newResumes = [...resumes, newResume];
    // setResumes(newResumes);
    // onDataChange?.(newResumes);
  };

  const handleEdit = (resume: Resume) => {
    setSelectedResume(resume);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedResume: Resume) => {
    try {
      // TODO: API 호출로 실제 수정
      // await api.updateResume(updatedResume);
      
      // 로컬 상태 업데이트
      const newResumes = resumes.map(r =>
        r.id === updatedResume.id ? updatedResume : r
      );
      setResumes(newResumes);
      onDataChange?.(newResumes);
      
      console.log("이력서 수정 완료:", updatedResume);
    } catch (error) {
      console.error("이력서 수정 실패:", error);
      alert("이력서 수정에 실패했습니다.");
    }
  };

  const handleDelete = (resume: Resume) => {
    console.log("이력서 삭제:", resume);
    // TODO: 이력서 삭제 로직
    // await api.deleteResume(resume.id);
    // const newResumes = resumes.filter(r => r.id !== resume.id);
    // setResumes(newResumes);
    // onDataChange?.(newResumes);
  };
  const columns: TableColumn[] = [
    { key: "id", label: "ID", width: "80px" }
  ];

  const actions: TableAction[] = [
    {
      label: "수정",
      type: "edit",
      onClick: resume => handleEdit(resume)
    },
    {
      label: "삭제",
      type: "delete",
      onClick: resume => handleDelete(resume)
    }
  ];

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <Style.ResumeSection>
        <SectionHeader title="이력서 관리" />
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>이력서를 불러오는 중...</p>
        </div>
      </Style.ResumeSection>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <Style.ResumeSection>
        <SectionHeader title="이력서 관리" />
        <div style={{ textAlign: "center", padding: "40px", color: "#dc3545" }}>
          <p>이력서를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </Style.ResumeSection>
    );
  }

  return (
    <Style.ResumeSection>
      <SectionHeader
        title="이력서 관리"
        showAddButton={true}
        addButtonText="새 이력서 추가"
        onAddClick={handleAdd}
      />
      <DataTable
        columns={columns}
        data={resumes}
        actions={actions}
      />
      <ResumeEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resume={selectedResume}
        onSave={handleSave}
      />
    </Style.ResumeSection>
  );
}
