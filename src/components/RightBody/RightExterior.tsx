import styled from "@emotion/styled";
import Badge from "./MainSection/Badge";
import RightInterior from "./RightInterior";

export default function RightExterior({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Exterior>
      <Badge />
      <RightInterior>{children}</RightInterior>
    </Exterior>
  );
}

const Exterior = styled.div`
  width: calc(100% - 40px);
  height: 90%;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;

  position: relative;

  .badge {
    position: absolute;
    top: -36px;
    right: -26px;
    width: 150px;
  }
`;
