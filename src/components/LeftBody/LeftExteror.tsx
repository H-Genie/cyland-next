import styled from "@emotion/styled";
import LeftInterior from "./LeftInterior";

export default function LeftExteror() {
  return (
    <Exterior>
      <LeftInterior />
    </Exterior>
  );
}

const Exterior = styled.div`
  width: 90%;
  height: 90%;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
