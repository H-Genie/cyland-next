import { useState } from "react";
import styled from "@emotion/styled";
import { deleteComment, updateComment, toggleForm } from "utils";

export const checkUpdate = (id: number) => {
  document.getElementById(`${id}_delete`)!.classList.remove("display");
  document.getElementById(`${id}_update`)!.classList.toggle("display");
};

export const checkDelete = (id: number) => {
  document.getElementById(`${id}_update`)!.classList.remove("display");
  document.getElementById(`${id}_delete`)!.classList.toggle("display");
};

const Comments = ({ comment }: { [x: string]: any }) => {
  const [editing, setEditing] = useState(false);
  const toggleEditing = () => setEditing(prev => !prev);

  return (
    <>
      {editing ? (
        <CommentList>
          <div className="display-flex">
            <Dot />
            <FormComment
              onSubmit={e => updateComment(e, comment.id, toggleEditing)}
            >
              <InputComment type="text" defaultValue={comment.comment} />
              <Button>
                <p>수정</p>
              </Button>
              <Button onClick={toggleEditing}>
                <p>취소</p>
              </Button>
            </FormComment>
          </div>
        </CommentList>
      ) : (
        <CommentList>
          <div className="display-flex">
            <Dot />
            <p>
              {comment.comment} ({comment.nickname}) {comment.date}
            </p>
          </div>

          <Figure>
            <Form
              id={`${comment.id}_update`}
              onSubmit={e => toggleForm(e, comment.password, toggleEditing)}
            >
              <Input type="password" placeholder="수정 : 비밀번호 입력" />
              <Button>
                <p>확인</p>
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
      )}
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
  display: none;
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
  width: 400px;
`;
