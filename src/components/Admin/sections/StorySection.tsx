import React, { useState, useEffect } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "../shared/SectionHeader";
import DataTable, { TableColumn, TableAction } from "../shared/DataTable";
import { useStory } from "../../../hooks/queries/useStory";
import { useStoryUpdate } from "../../../hooks/queries/useStoryUpdate";
import { useStoryToggleActive } from "../../../hooks/queries/useStoryToggleActive";
import { useStoryCreate } from "../../../hooks/queries/useStoryCreate";
import { useStoryDelete } from "../../../hooks/queries/useStoryDelete";
import ContentEditModal from "../shared/ContentEditModal";

export interface Story {
  id?: number;
  name?: string;
  content?: string;
  createdAt?: string;
  active?: boolean;
}

interface StorySectionProps {
  initialStories?: Story[];
  onDataChange?: (stories: Story[]) => void;
}

export default function StorySection({
  initialStories,
  onDataChange
}: StorySectionProps) {
  const { data: apiStories, isLoading, isError } = useStory();
  const updateStoryMutation = useStoryUpdate();
  const createStoryMutation = useStoryCreate();
  const toggleActiveMutation = useStoryToggleActive();
  const deleteStoryMutation = useStoryDelete();
  const [stories, setStories] = useState<Story[]>(initialStories || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isNewStory, setIsNewStory] = useState(false);

  // API에서 데이터를 가져오면 상태 업데이트
  useEffect(() => {
    if (apiStories && Array.isArray(apiStories)) {
      setStories(apiStories);
    }
  }, [apiStories]);

  const handleAdd = () => {
    setIsNewStory(true);
    setSelectedStory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (story: Story) => {
    setIsNewStory(false);
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleSave = async (storyData: Story) => {
    if (!storyData.name?.trim()) {
      alert("이름은 필수입니다.");
      return;
    }
    if (!storyData.content) {
      alert("내용은 필수입니다.");
      return;
    }

    try {
      if (isNewStory) {
        const newStory = await createStoryMutation.mutateAsync({
          name: storyData.name,
          content: storyData.content
        });

        // 로컬 상태 업데이트
        const newStories = [...stories, newStory];
        setStories(newStories);
        onDataChange?.(newStories);

        alert("스토리가 성공적으로 추가되었습니다.");
      } else {
        // 수정
        if (!storyData.id) {
          alert("ID가 필요합니다.");
          return;
        }

        await updateStoryMutation.mutateAsync({
          id: storyData.id,
          name: storyData.name,
          content: storyData.content
        });

        // 로컬 상태 업데이트
        const newStories = stories.map(s =>
          s.id === storyData.id ? storyData : s
        );
        setStories(newStories);
        onDataChange?.(newStories);

        alert("스토리가 성공적으로 수정되었습니다.");
      }
    } catch (error) {
      console.error(isNewStory ? "스토리 추가 실패:" : "스토리 수정 실패:", error);
      alert(isNewStory ? "스토리 추가에 실패했습니다." : "스토리 수정에 실패했습니다.");
    }
  };

  const handleToggleActive = async (story: Story) => {
    if (!story.id) {
      alert("ID가 없습니다.");
      return;
    }

    try {
      const newActive = !story.active;
      await toggleActiveMutation.mutateAsync({
        id: story.id,
        active: newActive
      });

      // 로컬 상태 업데이트
      const newStories = stories.map(s =>
        s.id === story.id ? { ...s, active: newActive } : s
      );
      setStories(newStories);
      onDataChange?.(newStories);
    } catch (error) {
      console.error("스토리 active 상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (story: Story) => {
    if (!story.id) {
      alert("ID가 없습니다.");
      return;
    }

    if (!confirm("정말로 이 스토리를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteStoryMutation.mutateAsync({
        id: story.id
      });

      // 로컬 상태 업데이트
      const newStories = stories.filter(s => s.id !== story.id);
      setStories(newStories);
      onDataChange?.(newStories);

      alert("스토리가 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("스토리 삭제 실패:", error);
      alert("스토리 삭제에 실패했습니다.");
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
      onClick: story => handleEdit(story)
    },
    {
      label: "삭제",
      type: "delete",
      onClick: story => handleDelete(story)
    }
  ];

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <Style.StorySection>
        <SectionHeader title="스토리 관리" />
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>스토리를 불러오는 중...</p>
        </div>
      </Style.StorySection>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <Style.StorySection>
        <SectionHeader title="스토리 관리" />
        <div style={{ textAlign: "center", padding: "40px", color: "#dc3545" }}>
          <p>스토리를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </Style.StorySection>
    );
  }

  return (
    <Style.StorySection>
      <SectionHeader
        title="스토리 관리"
        showAddButton={true}
        addButtonText="새 스토리 추가"
        onAddClick={handleAdd}
      />
      <DataTable
        columns={columns}
        data={stories}
        actions={actions}
        statusColumn={{
          key: "active",
          activeValue: true,
          inactiveValue: false,
          onClick: story => handleToggleActive(story)
        }}
      />
      <ContentEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsNewStory(false);
        }}
        item={selectedStory}
        onSave={handleSave}
        isNew={isNewStory}
        title="스토리"
      />
    </Style.StorySection>
  );
}
