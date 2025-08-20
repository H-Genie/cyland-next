import LeftBody from "./LeftBody";
import RightBody from "./RightBody";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main style={{ width: 1280, height: 720, display: "flex" }}>
        <LeftBody />
        <RightBody>{children}</RightBody>
      </main>
    </>
  );
}
