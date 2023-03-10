import React from "react";
import styled from "styled-components";

const Today = () => {
  return (
    <Div>
      <h6>TODAY IS...</h6>
      <select>
        <option>๐ ํ๋ณต</option>
        <option>๐ฅบ ์ธ๋ก์</option>
        <option>๐ท ์ํ</option>
        <option>๐ ๊ธฐ์จ</option>
        <option>๐ช ํ์ดํ</option>
        <option>๐ ์ฆ๊ฑฐ์</option>
        <option>๐ฌ ๊ทธ๋ฅ</option>
        <option>๐ญ ์ฌํ</option>
        <option>๐ฃ ์ด๋ฐ์</option>
        <option>โ ๊ท์ฐฎ์</option>
        <option>๐ ์ค๋ </option>
        <option>โณ ๋ฐ์จ</option>
        <option>๐ ์ฐ์ธ</option>
        <option>๐ ์ฌ๋ํด</option>
        <option>๐ฅ ๊ทธ๋ฆฌ์</option>
        <option>๐ ์ฌ์ฌ</option>
        <option>๐ด ํผ๊ณค</option>
        <option>๐ซ ํ๋ฆ</option>
        <option>๐ ๋ฐฐ๊ณ ํ</option>
        <option>๐บ ์ ๊ณ ํ</option>
      </select>
    </Div>
  );
};

export default Today;

const Div = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid #85c8f2;
  display: flex;
  align-items: center;
  padding: 0 20px;

  h6 {
    width: 50%;
    color: #85c8f2;
  }

  option {
  }

  select {
    color: rgb(108, 108, 108);
    font-family: SCDream4;
    font-size: 14px;
    letter-spacing: -0.5px;
    letter-spacing: 0;
    line-height: 18px;

    cursor: pointer;
    padding: 11px 20px;
    border: none;
    outline: none;
    background: none;
    appearance: none;
  }
`;
