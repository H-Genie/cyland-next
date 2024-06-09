import { useState } from "react";
import styled from "@emotion/styled";
import { getClock } from "utils";

export default function Message() {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(getClock());

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <>
      <MessageOrForm>
        {isEditing ? (
          <Form onSubmit={onSubmit}>
            <Textarea
              defaultValue={message}
              onChange={e => setMessage(e.target.value)}
            />
            <Button>
              <p>수정</p>
            </Button>
          </Form>
        ) : (
          <div style={{ maxHeight: "100%" }}>
            {message.split("\n").map((line, index) => (
              <p key={index}>
                {line}
                <br />
              </p>
            ))}
          </div>
        )}
      </MessageOrForm>
      <ButtonSection>
        <p onClick={() => setIsEditing(prev => !prev)}>
          <span>▶&nbsp;</span>
          EDIT
        </p>
      </ButtonSection>
    </>
  );
}

const MessageOrForm = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;

  p {
    text-align: center;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  border: 1px solid #decbc8;
  outline: none;
  font-family: "S-CoreDream-4Regular";
`;

const Button = styled.button`
  width: 30px;
  height: 20px;
  position: absolute;
  background-color: white;
  border: 1px solid #decbc8;
  cursor: pointer;

  right: 0;
  bottom: 0;

  p {
    font-size: 12px;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid #85c8f2;

  p {
    cursor: pointer;
  }

  span {
    font-size: 12px;
  }
`;
