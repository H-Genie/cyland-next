import { css } from "@emotion/react";
import { font } from "./font";

const globalStyle = css`
  ${font}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ul,
  ol,
  li {
    list-style: none;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(./images/background.jpg);
    background-size: cover;
    cursor: url(./images/cursor.png), auto;
  }
`;

export default globalStyle;
