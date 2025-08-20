import { Metadata } from "next";
import ResumeBody from "components/RightBody/ResumeSection/ResumeBody";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "프론트엔드 개발자 서형진입니다. 리액트 프로젝트를 담당하고 있습니다. 자바스크립트 기반의 풀스택 개발자를 목표로 끊임없이 노력중입니다"
};

export default function Resume() {
  return <ResumeBody />;
}
