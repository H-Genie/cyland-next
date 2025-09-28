import { useCommentCreate } from "hooks/queries/useCommentCreate";
import { encryptAES } from "utils/crypto";

export const useCommentCreateForm = () => {
  const createCommentMutation = useCommentCreate();

  const setComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const firstElement = form.elements[0];
    const thirdElement = form.elements[2];
    const fourthElement = form.elements[3];

    let comment: string | undefined,
      nickname: string | undefined,
      password: string | undefined;

    if (firstElement instanceof HTMLInputElement) comment = firstElement.value;
    if (thirdElement instanceof HTMLInputElement) nickname = thirdElement.value;
    if (fourthElement instanceof HTMLInputElement)
      password = fourthElement.value;

    const checkEmpty =
      !comment || !nickname || !password || password.length < 4;

    if (checkEmpty) {
      alert("빈 칸이 있거나, 자릿수가 맞는지 확인해주세요");
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        comment: comment!,
        nickname: nickname!,
        password: encryptAES(password!)
      });

      if (firstElement instanceof HTMLInputElement) firstElement.value = "";
      if (thirdElement instanceof HTMLInputElement) thirdElement.value = "";
      if (fourthElement instanceof HTMLInputElement) fourthElement.value = "";
    } catch (error) {
      console.error("댓글 생성 실패:", error);
    }
  };

  return {
    setComment,
    isLoading: createCommentMutation.isPending,
    isError: createCommentMutation.isError,
    error: createCommentMutation.error
  };
};
