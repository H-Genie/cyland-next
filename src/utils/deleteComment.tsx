import { doc, deleteDoc } from "firebase/firestore";
import { db } from "hooks/useFirestore";

export const deleteComment = (
  e: React.FormEvent<HTMLFormElement>,
  password: string,
  id: number
) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const firstElement = form.elements[0];

  let inputPwd: string | undefined;
  if (firstElement instanceof HTMLInputElement) inputPwd = firstElement.value;

  if (inputPwd === password) {
    const ok = window.confirm("메시지를 삭제할까요?");
    if (ok) deleteDoc(doc(db, `cyland/${id}`));
  } else window.alert("비밀번호를 확인해주세요");

  if (firstElement instanceof HTMLInputElement) firstElement.value = "";
};
