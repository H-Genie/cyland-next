import { useCommentUpdate } from "hooks/queries/useCommentUpdate";
import { encryptAES } from "utils/crypto";

export const useUpdateComment = () => {
  const { mutate: updateCommentMutation, isPending } = useCommentUpdate();

  const updateComment = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    password: string,
    nickname: string,
    toggleEditing: () => void
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const commentInput = form.elements[0] as HTMLInputElement;
    const nicknameInput = form.elements[1] as HTMLInputElement;
    const passwordInput = form.elements[2] as HTMLInputElement;

    const comment = commentInput.value;
    const inputNickname = nicknameInput.value;
    const inputPassword = passwordInput.value;

    if (!comment.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    if (!inputNickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (!inputPassword.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    updateCommentMutation(
      {
        id,
        comment,
        nickname: inputNickname,
        password: encryptAES(inputPassword)
      },
      {
        onSuccess: () => {
          toggleEditing();
        },
        onError: error => {
          console.error("댓글 수정 실패:", error);
          alert("댓글 수정에 실패했습니다. 비밀번호를 확인해주세요.");
        }
      }
    );
  };

  return { updateComment, isPending };
};
