import { useCommentDelete } from "hooks/queries/useCommentDelete";
import { encryptAES } from "utils/crypto";

export const useDeleteComment = () => {
  const deleteCommentMutation = useCommentDelete();

  const deleteComment = async (
    e: React.FormEvent<HTMLFormElement>,
    password: string,
    id: number
  ) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const firstElement = form.elements[0];

    let inputPwd: string | undefined;
    if (firstElement instanceof HTMLInputElement) inputPwd = firstElement.value;

    if (!inputPwd) {
      window.alert("비밀번호를 입력해주세요");
      return;
    }

    const ok = window.confirm("메시지를 삭제할까요?");
    if (!ok) return;

    try {
      await deleteCommentMutation.mutateAsync({
        id,
        password: encryptAES(inputPwd)
      });

      // 성공 시 폼 초기화
      if (firstElement instanceof HTMLInputElement) firstElement.value = "";
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      window.alert("비밀번호를 확인해주세요");
    }
  };

  return {
    deleteComment,
    isLoading: deleteCommentMutation.isPending,
    isError: deleteCommentMutation.isError,
    error: deleteCommentMutation.error
  };
};
