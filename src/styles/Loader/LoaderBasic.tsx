import Circle from "./Circle"

export default function LoaderBasic() {
  return (
    <ol style={{ display: "flex", justifyContent: "center" }}>
      <Circle />
      <Circle />
      <Circle />
    </ol>
  )
}
