import styled from "@emotion/styled";

export default function Today() {
  const data = [
    "😊 행복",
    "🥺 외로움",
    "😷 아픔",
    "😁 기쁨",
    "💪 화이팅",
    "😄 즐거움",
    "💬 그냥",
    "😭 슬픔",
    "💣 열받음",
    "⛔ 귀찮음",
    "😍 설렘",
    "⏳ 바쁨",
    "😔 우울",
    "💚 사랑해",
    "😥 그리움",
    "😕 심심",
    "😴 피곤",
    "😫 힘듦",
    "🍚 배고픔",
    "🍺 술고픔"
  ];

  return (
    <Container>
      <h6>TODAY IS...</h6>
      <select>
        {data.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid #85c8f2;
  display: flex;
  align-items: center;
  padding: 0 20px;

  h6 {
    width: 50%;
    color: #85c8f2;
  }

  option {
  }

  select {
    color: rgb(108, 108, 108);
    font-family: S-CoreDream-4Regular;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 18px;

    cursor: pointer;
    padding: 11px 20px;
    border: none;
    outline: none;
    background: none;
    appearance: none;
  }
`;
