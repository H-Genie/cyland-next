import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Visitor from 'components/RightInterior/Visitor/Visitor'
import { Section } from 'style/Router'

const Resume = () => {
  const fullScreen = () => {
    document.querySelector("#video").play();
    document.querySelector("#play").style = "display:none;";
    document.querySelector("#video").setAttribute('controls', '');
  }

  const moveToVideo = time => {
    document.querySelector("#video").currentTime = time;
  }

  const resume = (
    <>
      <Head>
        <meta name="description" content="프론트엔드 개발자 서형진입니다. 리액트 프로젝트를 담당하고 있습니다. 자바스크립트 기반의 풀스택 개발자를 목표로 끊임없이 노력중입니다" />
        <title>Resume</title>
      </Head>
      <br />
      <h6 style={{ color: '#6E9BB8' }}>동영상 버전의 이력서 입니다. </h6>
      <br />
      <h6 style={{ color: '#6E9BB8' }}>상세한 신상정보가 포함된 PDF본 이력서는 지원서에 첨부하였습니다.</h6>
      <br />
      <br />

      <P onClick={() => moveToVideo(10)}>▶ Office Automation Skills (0:10)</P>
      <br />
      <P onClick={() => moveToVideo(30.5)}>▶ Office Automation Portfolio (0:30)</P>
      <br />
      <P onClick={() => moveToVideo(128)}>▶ Coding Skills & Portfolio(2:08)</P>
      <br />
    </>
  );

  const stack = (
    <>
      <br />
      <h4 style={{ color: '#6E9BB8' }}>Tech Stack</h4>
      <br />
      <h6>
        자바스크립트 기반의 풀스택 개발자가 되는 것을 목표로 <br />
        끊임없이 노력중입니다.
      </h6>
      <br /><br />
      <p>
        <SubColor>❏ 퍼블리싱</SubColor> : 디자인 가이드 그대로 구현 가능 (반응형 포함) <br /><br />
        <SubColor>❏ 자바스크립트</SubColor> : 함수와 이벤트로 자유로운 DOM 조작 <br /> &nbsp;&nbsp; / 배열 및 객체 관리로 백그라운드 로직 설계 <br /><br />
        <SubColor>❏ 리액트</SubColor> : 상태관리, 데이터 페칭으로 SPA 구현<br /> &nbsp;&nbsp; /
        Next.js로 SSR 및 SEO 구성<br /><br />
        <SubColor>❏ Node.js</SubColor> : Mongo DB를 활용한 기초적인 REST API 설계
      </p>
      <br />
    </>
  );

  return (
    <Section>
      <VideoContainer>
        <Video poster="./images/poster.jpg" id="video" muted loop playsInline preload="none">
          <source src="./images/resume.mp4" type="video/mp4" />
        </Video>
        <Play id="play" onClick={fullScreen}>
          &#9654;
        </Play>
      </VideoContainer>

      <Visitor no={1} content={resume} />
      <Visitor no={2} content={stack} />
    </Section>
  )
}

export default Resume;

const VideoContainer = styled.div`
    width : 725px;
    height : 407px;
    border : 5px solid #85c8f2;
    box-shadow : 10px 10px #85c8f2;
    box-sizing : content-box;
    position : relative;
    margin-bottom : 30px;
`;

const Video = styled.video`
    width : 100%;
    outline : none;
`;

const Play = styled.div`
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
    cursor : pointer;
`;

const P = styled.p`
    width : fit-content;
    cursor : pointer;
`;

const SubColor = styled.span`
  color: #B88181;
`