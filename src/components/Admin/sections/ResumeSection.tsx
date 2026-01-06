import React, { useState, useEffect } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "./SectionHeader";
import DataTable, { TableColumn, TableAction } from "./DataTable";
import { useResume } from "../../../hooks/queries/useResume";
import { useResumeUpdate } from "../../../hooks/queries/useResumeUpdate";
import { useResumeToggleActive } from "../../../hooks/queries/useResumeToggleActive";
import { useResumeCreate } from "../../../hooks/queries/useResumeCreate";
import ResumeEditModal from "./ResumeEditModal";

export interface Resume {
  id?: number;
  content?: string;
  title?: string;
  category?: string;
  status?: boolean;
  active?: boolean;
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
  const updateResumeMutation = useResumeUpdate();
  const createResumeMutation = useResumeCreate();
  const toggleActiveMutation = useResumeToggleActive();
  const [resumes, setResumes] = useState<Resume[]>(initialResumes || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isNewResume, setIsNewResume] = useState(false);

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
    setIsNewResume(true);
    setSelectedResume(null);
    setIsModalOpen(true);
  };

  const handleEdit = (resume: Resume) => {
    setIsNewResume(false);
    setSelectedResume(resume);
    setIsModalOpen(true);
  };

  const handleSave = async (resumeData: Resume) => {
    if (!resumeData.content) {
      alert("내용은 필수입니다.");
      return;
    }

    try {
      if (isNewResume) {
        // 새로 추가
        const newResume = await createResumeMutation.mutateAsync({
          content: resumeData.content
        });

        // 로컬 상태 업데이트
        const newResumes = [...resumes, newResume];
        setResumes(newResumes);
        onDataChange?.(newResumes);

        alert("이력서가 성공적으로 추가되었습니다.");
      } else {
        // 수정
        if (!resumeData.id) {
          alert("ID가 필요합니다.");
          return;
        }

        await updateResumeMutation.mutateAsync({
          id: resumeData.id,
          content: resumeData.content
        });

        // 로컬 상태 업데이트
        const newResumes = resumes.map(r =>
          r.id === resumeData.id ? resumeData : r
        );
        setResumes(newResumes);
        onDataChange?.(newResumes);

        alert("이력서가 성공적으로 수정되었습니다.");
      }
    } catch (error) {
      console.error(isNewResume ? "이력서 추가 실패:" : "이력서 수정 실패:", error);
      alert(isNewResume ? "이력서 추가에 실패했습니다." : "이력서 수정에 실패했습니다.");
    }
  };

  const handleToggleActive = async (resume: Resume) => {
    if (!resume.id) {
      alert("ID가 없습니다.");
      return;
    }

    try {
      const newActive = !resume.active;
      await toggleActiveMutation.mutateAsync({
        id: resume.id,
        active: newActive
      });

      // 로컬 상태 업데이트
      const newResumes = resumes.map(r =>
        r.id === resume.id ? { ...r, active: newActive } : r
      );
      setResumes(newResumes);
      onDataChange?.(newResumes);
    } catch (error) {
      console.error("이력서 active 상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
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
    { key: "id", label: "ID", width: "80px" },
    { key: "active", label: "상태", width: "100px" }
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
        statusColumn={{
          key: "active",
          activeValue: true,
          inactiveValue: false,
          onClick: resume => handleToggleActive(resume)
        }}
      />
      <ResumeEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsNewResume(false);
        }}
        resume={selectedResume}
        onSave={handleSave}
        isNew={isNewResume}
      />
    </Style.ResumeSection>
  );
}
