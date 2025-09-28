import styled from "@emotion/styled";
import InputComment from "./InputComment";
import Comments from "./Comments";
import { useComment } from "hooks/queries/useComment";
import Loader from "styles/Loader";

const CommentContainer = () => {
  const { data: comments, isError, isLoading } = useComment();

  if (isLoading) return <Loader.Basic />;
  if (isError) return <div>에러가 발생했습니다. 새로고침해주세요.</div>;
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
  height: 148px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
