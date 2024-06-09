import { doc, setDoc } from "firebase/firestore";
import { db } from "hooks/useFirestore";

export const setComment = async (e: React.FormEvent<HTMLFormElement>) => {
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
  if (fourthElement instanceof HTMLInputElement) password = fourthElement.value;

  const checkEmpty = !comment || !nickname || !password || password.length < 4;

  if (checkEmpty) {
    alert("빈 칸이 있거나, 자릿수가 맞는지 확인해주세요");
    return;
  }

  const id = Date.now();
  const commentObj = {
    id,
    comment,
    nickname,
    password,
    date: new Date().toLocaleDateString()
  };

  try {
    await setDoc(doc(db, `cyland/${id}`), commentObj);
  } catch (error) {
    console.error(error);
  }

  if (firstElement instanceof HTMLInputElement) firstElement.value = "";
  if (thirdElement instanceof HTMLInputElement) thirdElement.value = "";
  if (fourthElement instanceof HTMLInputElement) fourthElement.value = "";
};
