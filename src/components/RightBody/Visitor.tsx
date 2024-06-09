import styled from "@emotion/styled";
import {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState
} from "react";

type VisitorProps = {
  no: number;
  contents: ReactElement<any, string | JSXElementConstructor<any>>;
  notice?: boolean;
};

export default function Visitor({
  no,
  contents,
  notice = false
}: VisitorProps) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    setNow(new Date().toLocaleString("ko-kr"));
  }, []);

  return (
    <Container>
      <div
        className="visitor-top"
        style={{
          background: notice ? "rgb(255,238,210)" : "#f1f1f1"
        }}
      >
        <p>
          <span>NO. {no}</span>
          서형진
          <span>{now}</span>
        </p>
      </div>
      <div className="visitor-bottom">
        <img src={"/images/minimi-1.jpg"} alt="profile" className="profile" />
        <div className="contents">{contents}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 50px;

  .visitor-top {
    width: 100%;
    height: 30px;
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    background-color: #f1f1f1;

    p {
      font-size: 16px;
      color: rgb(85, 26, 139);
      display: flex;
      align-items: center;
    }

    span {
      font-size: 12px;
      color: rgb(108, 108, 108);

      &:nth-of-type(1) {
        margin: 0 30px;
      }
      &:nth-of-type(2) {
        margin-left: 50px;
      }
    }
  }

  .visitor-bottom {
    display: flex;
    margin-top: 10px;
  }

  .profile {
    width: 170px;
    height: 170px;
    padding: 16px;
    border-radius: 32px;
    margin-top: 4px;
  }

  .contents {
    width: 100%;
    min-height: 170px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 17px;
  }

  .portfolio {
    width: 280px;
  }
`;
