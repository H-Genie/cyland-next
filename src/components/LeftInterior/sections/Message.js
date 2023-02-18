import React, { useState } from "react";
import styled from "styled-components";
import { useClock } from "../../../utils/useClock";

const Message = () => {
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(useClock());

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage(e.target[0].value);
    setEditing(false);
  };

  return (
    <>
      <MsgSection>
        {editing ? (
          <Form onSubmit={onSubmit}>
            <Textarea defaultValue={message} />
            <ButtonSubmit>
              <p>수정</p>
            </ButtonSubmit>
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
      </MsgSection>
      <Edit>
        <p
          onClick={() => setEditing((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <span style={{ fontSize: "12px" }}>▶&nbsp;</span>
          EDIT
        </p>
      </Edit>
    </>
  );
};

export default Message;

const MsgSection = styled.div`
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
  font-family: "SCDream4";
`;

const Button = styled.button`
  width: 30px;
  height: 20px;
  position: absolute;
  background-color: white;
  border: 1px solid #decbc8;
  cursor: pointer;

  p {
    font-size: 12px;
  }
`;

const ButtonSubmit = styled(Button)`
  right: 0;
  bottom: 0;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid #85c8f2;
`;
