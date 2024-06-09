export const toggleForm = (
  e: React.FormEvent<HTMLFormElement>,
  password: string,
  toggleEditing: () => void
) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const firstElement = form.elements[0];

  let inputPwd: string | undefined;
  if (firstElement instanceof HTMLInputElement) inputPwd = firstElement.value;

  if (inputPwd === password) {
    toggleEditing();
  } else {
    window.alert("비밀번호를 확인해주세요");
  }

  if (firstElement instanceof HTMLInputElement) firstElement.value = "";
};
