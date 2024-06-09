import CommentContainer from "components/RightBody/MainSection/CommentContainer";

export default function Main() {
  return (
    <>
      <img
        src={"/images/miniroom.jpg"}
        alt="miniroom"
        style={{
          marginBottom: 10,
          width: "100%",
          height: 350
        }}
      />
      <CommentContainer />
    </>
  );
}
