import React, { useState, useEffect } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "./SectionHeader";
import DataTable, { TableColumn, TableAction } from "./DataTable";
import { useComment } from "../../../hooks/queries/useComment";
import { useCommentDelete } from "../../../hooks/queries/useCommentDelete";
import { useCommentToggleActive } from "../../../hooks/queries/useCommentToggleActive";

export interface Comment {
  id: number;
  nickname: string;
  comment: string; // API에서는 'comment' 필드 사용
  created_at: string; // API에서는 'created_at' 필드 사용
  active?: boolean; // API에서는 'active' 필드 사용
}

export default function CommentSection() {
  const { data: apiComments, isLoading, isError } = useComment();
  const deleteCommentMutation = useCommentDelete();
  const toggleActiveMutation = useCommentToggleActive();
  const [comments, setComments] = useState<Comment[]>([]);

  // API에서 데이터를 가져오면 상태 업데이트
  useEffect(() => {
    if (apiComments && Array.isArray(apiComments)) {
      setComments(apiComments);
    }
  }, [apiComments]);

  const handleEdit = (comment: Comment) => {
    console.log("댓글 수정:", comment);
    // TODO: 댓글 수정 로직
    // const updatedComment = await api.updateComment(comment);
    // const newComments = comments.map(c => c.id === comment.id ? updatedComment : c);
    // setComments(newComments);
    // onDataChange?.(newComments);
  };

  const handleDelete = async (comment: Comment) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        // 관리자 비밀번호를 사용하여 삭제 (실제 환경에서는 적절한 인증 방식 사용)
        await deleteCommentMutation.mutateAsync({
          id: comment.id,
          password: "admin" // 임시 관리자 비밀번호
        });

        // 삭제 성공 시 로컬 상태도 업데이트
        const newComments = comments.filter(c => c.id !== comment.id);
        setComments(newComments);

        alert("댓글이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  const handleToggleActive = async (comment: Comment) => {
    try {
      const newActive = !comment.active;
      await toggleActiveMutation.mutateAsync({
        id: comment.id,
        active: newActive
      });

      // 로컬 상태 업데이트
      const newComments = comments.map(c =>
        c.id === comment.id ? { ...c, active: newActive } : c
      );
      setComments(newComments);
    } catch (error) {
      console.error("댓글 active 상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };
  const columns: TableColumn[] = [
    { key: "id", label: "ID", width: "80px" },
    { key: "nickname", label: "닉네임", width: "120px" },
    { key: "comment", label: "댓글 내용" },
    { key: "created_at", label: "작성일", width: "180px" },
    { key: "active", label: "상태", width: "100px" }
  ];

  const actions: TableAction[] = [
    // {
    //   label: "수정",
    //   type: "edit",
    //   onClick: comment => handleEdit(comment)
    // },
    {
      label: "삭제",
      type: "delete",
      onClick: comment => handleDelete(comment)
    }
  ];

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <Style.CommentSection>
        <SectionHeader title="댓글 관리" />
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>댓글을 불러오는 중...</p>
        </div>
      </Style.CommentSection>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <Style.CommentSection>
        <SectionHeader title="댓글 관리" />
        <div style={{ textAlign: "center", padding: "40px", color: "#dc3545" }}>
          <p>댓글을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </Style.CommentSection>
    );
  }

  return (
    <Style.CommentSection>
      <SectionHeader title="댓글 관리" />
      <DataTable
        columns={columns}
        data={comments}
        actions={actions}
        statusColumn={{
          key: "active",
          activeValue: true,
          inactiveValue: false,
          onClick: comment => handleToggleActive(comment)
        }}
      />
    </Style.CommentSection>
  );
}
