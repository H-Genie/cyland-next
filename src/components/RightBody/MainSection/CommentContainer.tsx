import styled from "@emotion/styled";
import { useFirestore } from "hooks/useFirestore";
import InputComment from "./InputComment";
import Comments from "./Comments";

const CommentContainer = () => {
  const comments = useFirestore();

  return (
    <CommentsContainer>
      <InputComment />
      {comments.map(comment => (
        <Comments key={comment.id} comment={comment} />
      ))}
    </CommentsContainer>
  );
};

export default CommentContainer;

const CommentsContainer = styled.ul`
  width: 100%;
  height: 150px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
