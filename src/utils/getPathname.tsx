import { setColor } from "./setColor";

export const getPathname = () => {
  if (typeof window === "object") {
    setTimeout(() => {
      switch (window.location.pathname) {
        case "/":
          setColor(0);
          break;
        case "/resume":
          setColor(1);
          break;
        case "/portfolio":
          setColor(2);
          break;
        case "/story":
          setColor(3);
          break;
        default:
          break;
      }
    }, 100);
  }
};
