import React, { useState } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "../shared/SectionHeader";
import DataTable, { TableColumn, TableAction } from "../shared/DataTable";

export interface Story {
  id: number;
  content: string;
  createdAt: string;
}

interface StorySectionProps {
  initialStories: Story[];
  onDataChange?: (stories: Story[]) => void;
}

export default function StorySection({
  initialStories,
  onDataChange
}: StorySectionProps) {
  const [stories, setStories] = useState<Story[]>(initialStories);

  const handleAdd = () => {
    console.log("스토리 추가");
    // TODO: 스토리 추가 로직
    // const newStory = await api.createStory();
    // const newStories = [...stories, newStory];
    // setStories(newStories);
    // onDataChange?.(newStories);
  };

  const handleEdit = (story: Story) => {
    console.log("스토리 수정:", story);
    // TODO: 스토리 수정 로직
    // const updatedStory = await api.updateStory(story);
    // const newStories = stories.map(s => s.id === story.id ? updatedStory : s);
    // setStories(newStories);
    // onDataChange?.(newStories);
  };

  const handleDelete = (story: Story) => {
    console.log("스토리 삭제:", story);
    // TODO: 스토리 삭제 로직
    // await api.deleteStory(story.id);
    // const newStories = stories.filter(s => s.id !== story.id);
    // setStories(newStories);
    // onDataChange?.(newStories);
  };
  const columns: TableColumn[] = [
    { key: "id", label: "ID", width: "80px" },
    { key: "content", label: "내용" },
    { key: "createdAt", label: "작성일", width: "120px" }
  ];

  const actions: TableAction[] = [
    {
      label: "수정",
      type: "edit",
      onClick: story => handleEdit(story)
    },
    {
      label: "삭제",
      type: "delete",
      onClick: story => handleDelete(story)
    }
  ];

  return (
    <Style.StorySection>
      <SectionHeader
        title="스토리 관리"
        showAddButton={true}
        addButtonText="새 스토리 추가"
        onAddClick={handleAdd}
      />
      <DataTable columns={columns} data={stories} actions={actions} />
    </Style.StorySection>
  );
}
