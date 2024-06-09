import Head from "next/head";
import styled from "@emotion/styled";
import { Route } from "components/RightBody/Route";
import Visitor from "components/RightBody/Visitor";
import { resumes } from "components/RightBody/ResumeSection/MakeResumeVisitor";

export default function Resume() {
  const onFullScreen = () => {
    const video = document.querySelector("#video") as HTMLVideoElement;
    const play = document.querySelector("#play") as HTMLDivElement;

    video.play();
    play.style.cssText = "display:none;";
    video.setAttribute("controls", "");
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content="프론트엔드 개발자 서형진입니다. 리액트 프로젝트를 담당하고 있습니다. 자바스크립트 기반의 풀스택 개발자를 목표로 끊임없이 노력중입니다"
        />
        <title>Resume</title>
      </Head>
      <Route>
        <VideoContainer>
          <Video
            poster="./images/poster.jpg"
            id="video"
            muted
            loop
            playsInline
            preload="none"
          >
            <source src="./images/resume.mp4" type="video/mp4" />
          </Video>
          <PlayButton id="play" onClick={onFullScreen}>
            &#9654;
          </PlayButton>
        </VideoContainer>

        {resumes.map((resume, index) => (
          <Visitor key={index + 1} no={index + 1} contents={resume} />
        ))}
      </Route>
    </>
  );
}

const VideoContainer = styled.div`
  width: 725px;
  height: 407px;
  border: 5px solid #85c8f2;
  box-shadow: 10px 10px #85c8f2;
  box-sizing: content-box;
  position: relative;
  margin-bottom: 30px;
`;

const Video = styled.video`
  width: 100%;
  outline: none;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
