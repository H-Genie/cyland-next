import styled from "@emotion/styled";
import LeftBody from "./LeftBody";
import Badge from "./RightBody/MainSection/Badge";
import RightInterior from "./RightBody/RightInterior";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <LeftBody />
      <RightBody>
        <RightExterior>
          <Badge />
          <RightInterior appComponent={children}></RightInterior>
        </RightExterior>
      </RightBody>
    </Main>
  );
}

const Main = styled.main`
  width: 1280px;
  height: 720px;
  display: flex;
`;

const RightBody = styled.div`
  width: 70%;
  height: 100%;
  background-color: #85c8f2;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;

const RightExterior = styled.div`
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
