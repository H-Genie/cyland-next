import styled from "@emotion/styled";
import Navigator from "components/RightBody/Navigator";

export default function RightInterior({
  appComponent
}: {
  appComponent: React.ReactNode;
}) {
  return (
    <Interior>
      <h5>ⓦelcømё て♡ GЁЙIЭĿÅПÐ ~~♬</h5>
      <Navigator />
      {appComponent}
    </Interior>
  );
}

const Interior = styled.div`
  width: calc(100% - 40px);
  height: 90%;
  border: 2px solid #85c8f2;
  border-radius: 20px;
  margin-left: 10px;
  padding: 20px 30px 0 35px;
  color: rgb(108, 108, 108);

  & > h5 {
    font-family: "S-CoreDream-6Bold";
    letter-spacing: -1px;
    margin-bottom: 20px;
  }
`;
