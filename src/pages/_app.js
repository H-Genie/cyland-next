import React from 'react'
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components'

import GlobalStyle from '../style/GlobalStyle'
import CylandLeft from '../components/CylandLeft';
import Navigator from '../components/RightInterior/Navigator';
import { setPathname } from '../utils/selectColor';

const App = ({ Component, pageProps }) => {
  setPathname()

  return (
    <>
      <GlobalStyle />
      <Head>
        <meta name="google-site-verification" content="EopT8_hzyTbvtdBH05WxfhQ8ZQRb1GJipuVdulEh7t8" />
        <meta name="naver-site-verification" content="d37431be99e979a0e5f7cf5292765e1fb823a7ce" />

        <meta name="author" content="H-Genie" />
        <meta name="description" content="프론트엔드 개발자 서형진의 포트폴리오입니다. HTML, CSS , JavaScript, React, Node.Js, 지니닷컴, H-Genie" />
        <meta name="keywords" content="서형진의 포트폴리오, 지니닷컴, H-Genie, 프론트엔드 포트폴리오, 자바스크립트, 리액트, Node.js, Frontend Portfolio" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="H-Genie.com" />
        <meta property="og:url" content="https://h-genie.com" />
        <meta property="og:title" content="H-Genie.com" />
        <meta property="og:description" content="프론트엔드 개발자 서형진의 포트폴리오입니다. HTML, CSS , JavaScript, React, Node.Js, 지니닷컴, H-Genie" />
        <meta property="og:image" content="/images/og-iamge.jpg" />
        <title>H-Genie.com</title>
      </Head>
      <Container>
        <CylandLeft />
        <CylandRight>
          <RightExterior>
            <a href='https://nomadcoders.co/community/thread/577' target='_blank' rel='noreferrer'>
              <Image src='/images/badge.png' width={150} height={96} alt='badge' className="badge" />
            </a>
            <RightInterior>
              <h5>ⓦelcømё て♡ GЁЙIЭĿÅПÐ ~~♬</h5>
              <Navigator />
              <Component {...pageProps} />
            </RightInterior>
          </RightExterior>
        </CylandRight>
      </Container>
    </>
  )
}

export default App

const Container = styled.main`
    width : 1280px;
    height : 720px;
    display : flex;
`;

const CylandRight = styled.div`
  width : 70%;
  height : 100%;
  background-color : #85c8f2;
  border-radius : 20px;
  display : flex;
  align-items : center;
`

const RightExterior = styled.div`
  width : calc(100% - 40px);
    height : 90%;
    background-color : white;
    border-radius : 20px;
    display: flex;
    align-items: center;
    
    position: relative;

    .badge {
        position: absolute;
        top: -36px;
        right: -26px;
        width: 150px;
    }
`

const RightInterior = styled.div`
  width: calc(100% - 40px);
  height: 90%;
  border: 2px solid #85c8f2;
  border-radius: 20px;
  margin-left: 10px;
  padding: 20px 30px 0 35px;
  color : rgb(108, 108, 108);

  & > h5 {
      font-family : 'SCDream6';
      letter-spacing : -1px;
      margin-bottom : 20px;
  }
`