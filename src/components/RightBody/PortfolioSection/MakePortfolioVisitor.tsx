import styled from "@emotion/styled";

interface DataProps {
  data: {
    name: string;
    link: string;
    thumbnail: string;
    classification: string;
    language: string;
    description: string;
    study: string;
    range: string;
    sublink: object;
  };
}

export default function MakePortfolioVisitor({ data }: DataProps) {
  return (
    <Container>
      <br />

      <h6 style={{ color: "#B88181" }}>{data.classification}</h6>
      <br />

      <h4 style={{ color: "#6e9bb8" }}>{data.name}</h4>
      <br />

      <h6>{data.language}</h6>
      <br />
      <br />

      {data.description.split("\n").map((line, index) => (
        <p key={index}>
          {line}
          <br />
        </p>
      ))}

      <br />

      <p className="sub-color">{"< 주요 학습 내용 >"}</p>
      <p> : {data.study}</p>
      <br />

      <p className="sub-color">{"< 작업 범위 >"}</p>
      <p> : {data.range}</p>
      <br />

      <img src={data.thumbnail} alt={data.name} className="img" />
      <br />

      <div style={{ display: "flex" }}>
        {Object.entries(data.sublink).map(item => {
          if (typeof item[1] === "string") {
            return (
              <a
                key={item[0]}
                href={item[1]}
                target="_blank"
                style={{ marginRight: 15 }}
              >
                <p>{`< ${item[0]} 보기 >`}</p>
              </a>
            );
          } else return item[1];
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 170px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  & > p {
    line-height: 20px;
  }

  .img {
    width: 320px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 5px 5px 5px rgb(0, 0, 0, 0.3);
  }

  .sub-color {
    color: #b88181;
  }
`;
