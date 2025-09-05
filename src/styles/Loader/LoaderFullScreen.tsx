import Circle from "./Circle"

const LoaderContainerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  zIndex: 999,
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

export default function LoaderFullScreen() {
  return (
    <ol style={LoaderContainerStyle}>
      <Circle />
      <Circle />
      <Circle />
    </ol>
  )
}
