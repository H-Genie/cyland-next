import styled from "@emotion/styled";

export default function Circle() {
  return <LoaderDots />;
}

const LoaderDots = styled.li`
  width: 30px;
  height: 30px;
  animation: bounce 1s 0.7s linear infinite;
  border-radius: 100%;
  margin: 10px;

  &:nth-of-type(1) {
    background-color: #85c8f2;
  }

  &:nth-of-type(2) {
    animation-delay: 0.2s;
    background-color: #a7d9f5;
  }

  &:nth-of-type(3) {
    animation-delay: 0.4s;
    background-color: #5aafea;
  }

  @keyframes bounce {
    0%,
    50%,
    100% {
      transform: scale(1);
      filter: blur(0px);
    }
    25% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(1.4);
      background-color: #c3c6fb;
    }
  }
`;
