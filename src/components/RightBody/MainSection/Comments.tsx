"use client";
import styled from "@emotion/styled";
import { useCommentDeleteForm } from "hooks/useCommentDelete";
import { useCommentUpdateForm } from "hooks/useCommentUpdate";

export const checkUpdate = (id: number) => {
  document.getElementById(`${id}_delete`)!.classList.remove("display");
  document.getElementById(`${id}_update`)!.classList.toggle("display");

  // 수정 폼이 활성화되면 댓글 텍스트 숨기기
  const commentItem = document.querySelector(`[data-comment-id="${id}"]`);
  if (commentItem) {
    commentItem.classList.toggle("editing");
  }
};

export const checkDelete = (id: number) => {
  document.getElementById(`${id}_update`)!.classList.remove("display");
  document.getElementById(`${id}_delete`)!.classList.toggle("display");
};

const Comments = ({ comment }: { [x: string]: any }) => {
  const { deleteComment } = useCommentDeleteForm();
  const { updateComment, isPending } = useCommentUpdateForm();

  return (
    <>
      <CommentList className="comment-item" data-comment-id={comment.id}>
        <div className="display-flex">
          <Dot />
          <p className="comment-text">
            {comment.comment} ({comment.nickname}){" "}
            {comment.created_at
              ? comment.created_at.substring(0, 10)
              : comment.date || ""}
          </p>
          <div>
            <Form
              id={`${comment.id}_update`}
              onSubmit={e =>
                updateComment(
                  e,
                  comment.id,
                  comment.password,
                  comment.nickname,
                  () => {
                    document
                      .getElementById(`${comment.id}_update`)!
                      .classList.remove("display");
                    document
                      .querySelector(`[data-comment-id="${comment.id}"]`)!
                      .classList.remove("editing");
                  }
                )
              }
            >
              <InputComment
                type="text"
                defaultValue={comment.comment}
                placeholder="댓글을 입력하세요"
              />
              <InputNickname
                type="text"
                defaultValue={comment.nickname}
                placeholder="닉네임을 입력하세요"
              />
              <Input
                type="password"
                placeholder="수정 : 비밀번호 입력"
                style={{ width: 120 }}
              />
              <Button type="submit" disabled={isPending}>
                <p>수정</p>
              </Button>
            </Form>
            <Form
              id={`${comment.id}_delete`}
              onSubmit={e => deleteComment(e, comment.password, comment.id)}
            >
              <Input type="password" placeholder="삭제 : 비밀번호 입력" />
              <Button>
                <p>확인</p>
              </Button>
            </Form>
          </div>
        </div>

        <Figure>
          <img
            src="/images/edit.svg"
            alt="edit"
            onClick={() => checkUpdate(comment.id)}
          />
          <img
            src="/images/delete.svg"
            alt="delete"
            onClick={() => checkDelete(comment.id)}
          />
        </Figure>
      </CommentList>
    </>
  );
};

export default Comments;

const CommentList = styled.li`
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(108, 108, 108);

  &:last-child {
    border-bottom: none;
  }
  &:hover figure {
    display: flex;
  }

  .display-flex {
    display: flex;
    align-items: center;
  }

  /* 수정 모드일 때 댓글 텍스트 숨기기 */
  &.editing .comment-text {
    display: none;
  }
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  background-color: black;
  border-radius: 50%;
  margin: 0 10px;
`;

const FormComment = styled.form`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid #decbc8;
  cursor: pointer;

  p {
    font-size: 12px;
  }
`;

const Figure = styled.figure`
  margin-right: 10px;
  display: flex;
`;

const Form = styled.form`
  display: none;

  &.display {
    display: flex;
  }
`;

const Input = styled.input`
  height: 20px;
  border: 1px solid #decbc8;
  outline: none;
  font-family: "SCDream4";
`;

const InputComment = styled(Input)`
  /* width: 300px; */
`;

const InputNickname = styled(Input)`
  /* width: 100px; */
`;
