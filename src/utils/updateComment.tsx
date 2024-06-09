import { updateDoc, doc } from "firebase/firestore";
import { db } from "hooks/useFirestore";

export const updateComment = async (
  e: React.FormEvent<HTMLFormElement>,
  id: number,
  toggleEditing: () => void
) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const firstElement = form.elements[0];

  let value: string | undefined;
  if (firstElement instanceof HTMLInputElement) value = firstElement.value;

  if (value !== undefined) {
    const docRef = doc(db, "cyland", id.toString());

    try {
      await updateDoc(docRef, { comment: value });
    } catch (error) {
      console.error(error);
    }
  }

  toggleEditing();
};
