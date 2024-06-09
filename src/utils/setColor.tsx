export const setColor = (param: number) => {
  for (let i = 0; i < 4; i++) {
    document.getElementById(`ribbon${i}`)!.classList.remove("selected");
  }
  document.getElementById(`ribbon${param}`)!.classList.add("selected");
};
