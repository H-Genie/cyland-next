import React from "react";
import styled from "styled-components";
import { setComment } from "utils/crudComment";

const InputComment = () => {
  const toggleBottom = () => {
    document.querySelector("#bottom").classList.toggle("flex");
  };

  return (
    <InputContainer>
      <h6>Friends Say</h6>

      <form onSubmit={setComment}>
        <FormTop onClick={toggleBottom}>
          <Input
            type="text"
            maxLength="25"
            placeholder="일촌과 나누고 싶은 이야기를 남겨보세요~! (최대 25자)"
            autoComplete="false"
          />
          <Button>
            <p>작성</p>
          </Button>
        </FormTop>
        <FormBottom id="bottom">
          <InputBottom
            type="text"
            placeholder="일촌명 (최대 16자)"
            autoComplete="false"
          />
          <InputBottom
            type="password"
            placeholder="비밀번호 (4~12자)"
            autoComplete="false"
          />
        </FormBottom>
      </form>
    </InputContainer>
  );
};

export default InputComment;

const InputContainer = styled.div`
  width: 100%;
  min-height: 50px;
  max-height: 83px;
  background-color: rgb(245, 241, 241);
  display: flex;
  align-items: center;
  padding: 0 20px;

  h6 {
    color: black;
  }
`;

const FormTop = styled.div`
  height: 41.5px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 400px;
  height: 28px;
  background: white;
  margin: 0 20px;
  border: 1px solid #decbc8;
  font-size: 16px;
  outline: none;
  font-family: "SCDream4";
`;

const Button = styled.button`
  width: 50px;
  height: 28px;
  background-color: white;
  border: 1px solid #decbc8;
  cursor: pointer;
`;

const FormBottom = styled(FormTop)`
  display: none;

  &.flex {
    display: flex;
    align-items: flex-start;
    padding-top: 2px;
  }
`;

const InputBottom = styled(Input)`
  width: 180px;
  margin-left: 20px;
`;
