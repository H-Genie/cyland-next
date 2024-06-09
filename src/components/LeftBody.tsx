import styled from "@emotion/styled";
import LeftExteror from "./LeftBody/LeftExteror";

export default function LeftBody() {
  return (
    <Body>
      <LeftExteror />
    </Body>
  );
}

const Body = styled.div`
  width: 30%;
  height: 100%;
  background-color: #85c8f2;
  border-radius: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
