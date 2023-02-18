import { createGlobalStyle } from "styled-components";
import { font } from "./font";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin : 0;
        padding : 0;
    }

    ul, ol {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    a {
        text-decoration: none;
        color : inherit;
        cursor: pointer;
    }

    ${font}

    body {
        height : 100vh;
        display : flex;
        justify-content : center;
        align-items : center;
        background-image : url(./images/background.jpg);
        background-size: cover;
        cursor : url(./images/cursor.png), auto;
    }
`;

export default GlobalStyle;
