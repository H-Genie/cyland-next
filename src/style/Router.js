import styled from "styled-components";

export const Section = styled.section`
    width : 100%;
    height : calc(100% - 48px);
    overflow-y : scroll;

    &::-webkit-scrollbar {
        display : none;
    }
`;