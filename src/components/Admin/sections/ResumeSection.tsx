import React, { useState } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "./SectionHeader";
import DataTable, { TableColumn, TableAction } from "./DataTable";

export interface Resume {
  id: number;
  title: string;
  category: string;
  status: boolean;
}

interface ResumeSectionProps {
  initialResumes: Resume[];
  onDataChange?: (resumes: Resume[]) => void;
}

export default function ResumeSection({
  initialResumes,
  onDataChange
}: ResumeSectionProps) {
  const [resumes, setResumes] = useState<Resume[]>(initialResumes);

  const handleAdd = () => {
    console.log("이력서 추가");
    // TODO: 이력서 추가 로직
    // const newResume = await api.createResume();
    // const newResumes = [...resumes, newResume];
    // setResumes(newResumes);
    // onDataChange?.(newResumes);
  };

  const handleEdit = (resume: Resume) => {
    console.log("이력서 수정:", resume);
    // TODO: 이력서 수정 로직
    // const updatedResume = await api.updateResume(resume);
    // const newResumes = resumes.map(r => r.id === resume.id ? updatedResume : r);
    // setResumes(newResumes);
    // onDataChange?.(newResumes);
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
    { key: "title", label: "제목" },
    { key: "category", label: "분류", width: "120px" },
    { key: "status", label: "상태", width: "100px" }
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
          key: "status",
          activeValue: true,
          inactiveValue: false
        }}
      />
    </Style.ResumeSection>
  );
}
