import styled from "@emotion/styled";
import InputComment from "./InputComment";
import Comments from "./Comments";
import { useComment } from "hooks/queries/useComment";

const CommentContainer = () => {
  const { data: comments, isError, isLoading } = useComment();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <CommentsContainer>
      <InputComment />
      {comments?.map((comment: any) => (
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
