import { Fragment } from "react";

const moveToVideo = (time: number) => {
  const video = document.querySelector("#video") as HTMLVideoElement;
  video.currentTime = time;
};

class VideoPoint {
  constructor(
    public time: number,
    public label: string
  ) {}
}

const videoPoint = [
  new VideoPoint(10, "▶ Office Automation Skills (0:10)"),
  new VideoPoint(30.5, "▶ Office Automation Portfolio (0:30)"),
  new VideoPoint(128, "▶ Coding Skills & Portfolio(2:08)")
];

const resume1 = (
  <>
    <br />
    <h6 style={{ color: "#6E9BB8" }}>동영상 버전의 이력서 입니다. </h6>
    <br />
    <h6 style={{ color: "#6E9BB8" }}>
      상세한 신상정보가 포함된 PDF본 이력서는 지원서에 첨부하였습니다.
    </h6>
    <br />
    <br />

    {videoPoint.map((point, index) => (
      <Fragment key={index}>
        <p
          onClick={() => moveToVideo(point.time)}
          style={{ width: "fit-content", cursor: "pointer" }}
        >
          {point.label}
        </p>
        <br />
      </Fragment>
    ))}
  </>
);

const resume2 = (
  <>
    <br />
    <h4 style={{ color: "#6E9BB8" }}>Tech Stack</h4>
    <br />
    <h6>
      자바스크립트 기반의 풀스택 개발자가 되는 것을 목표로 <br />
      끊임없이 노력중입니다.
    </h6>
    <br />
    <br />
    <p>
      <span style={{ color: "#b88181" }}>❏ 퍼블리싱</span> : 디자인 가이드
      그대로 구현 가능 (반응형 포함) <br />
      <br />
      <span style={{ color: "#b88181" }}>❏ 자바스크립트</span> : 함수와 이벤트로
      자유로운 DOM 조작 <br /> &nbsp;&nbsp; / 배열 및 객체 관리로 백그라운드
      로직 설계 <br />
      <br />
      <span style={{ color: "#b88181" }}>❏ 리액트</span> : 상태관리, 데이터
      페칭으로 SPA 구현
      <br /> &nbsp;&nbsp; / Next.js로 SSR 및 SEO 구성
      <br />
      <br />
      <span style={{ color: "#b88181" }}>❏ Node.js</span> : Mongo DB를 활용한
      기초적인 REST API 설계
    </p>
    <br />
  </>
);

export const resumes = [resume1, resume2];
