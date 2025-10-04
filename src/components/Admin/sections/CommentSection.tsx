import React, { useState } from "react";
import * as Style from "../Admin.styles";
import SectionHeader from "./SectionHeader";
import DataTable, { TableColumn, TableAction } from "./DataTable";

export interface Comment {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  initialComments: Comment[];
  onDataChange?: (comments: Comment[]) => void;
}

export default function CommentSection({
  initialComments,
  onDataChange
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleEdit = (comment: Comment) => {
    console.log("댓글 수정:", comment);
    // TODO: 댓글 수정 로직
    // const updatedComment = await api.updateComment(comment);
    // const newComments = comments.map(c => c.id === comment.id ? updatedComment : c);
    // setComments(newComments);
    // onDataChange?.(newComments);
  };

  const handleDelete = (comment: Comment) => {
    console.log("댓글 삭제:", comment);
    // TODO: 댓글 삭제 로직
    // await api.deleteComment(comment.id);
    // const newComments = comments.filter(c => c.id !== comment.id);
    // setComments(newComments);
    // onDataChange?.(newComments);
  };
  const columns: TableColumn[] = [
    { key: "id", label: "ID", width: "80px" },
    { key: "nickname", label: "닉네임", width: "120px" },
    { key: "content", label: "댓글 내용" },
    { key: "createdAt", label: "작성일", width: "120px" }
  ];

  const actions: TableAction[] = [
    {
      label: "수정",
      type: "edit",
      onClick: comment => handleEdit(comment)
    },
    {
      label: "삭제",
      type: "delete",
      onClick: comment => handleDelete(comment)
    }
  ];

  return (
    <Style.CommentSection>
      <SectionHeader title="댓글 관리" />
      <DataTable columns={columns} data={comments} actions={actions} />
    </Style.CommentSection>
  );
}
