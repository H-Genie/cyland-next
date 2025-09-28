"use client";
import styled from "@emotion/styled";
import { Route } from "components/RightBody/common/Route";
import Visitor from "components/RightBody/common/Visitor";
import { useResume } from "hooks/queries/useResume";
import ReactJsxParser from "react-jsx-parser";
import Loader from "styles/Loader";

export default function ResumeBody() {
  const { data, isLoading, isError } = useResume();

  // const moveToVideo = (time: number) => {
  //   (document.querySelector("#video") as HTMLVideoElement).currentTime = time;
  // };

  const onFullScreen = () => {
    const video = document.querySelector("#video") as HTMLVideoElement;
    const play = document.querySelector("#play") as HTMLDivElement;

    video.play();
    play.style.cssText = "display:none;";
    video.setAttribute("controls", "");
  };

  if (isLoading) return <Loader.Basic />;
  if (isError) return <div>에러가 발생했습니다. 새로고침 해줏세요.</div>;

  return (
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

      {data?.map((item: { content: string }, index: number) => (
        <Visitor
          key={index + 1}
          no={index + 1}
          contents={<ReactJsxParser jsx={item.content} />}
        />
      ))}
    </Route>
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
