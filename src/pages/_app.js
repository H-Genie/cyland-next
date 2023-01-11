import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import GlobalStyle from '../style/GlobalStyle'
import Image from 'next/image';
import styled from 'styled-components'
import CylandLeft from '../components/CylandLeft';
import Navigator from '../components/RightInterior/Navigator';
import { setPathname } from '../utils/selectColor';

const App = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false)
  mounted && setPathname()

  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    <>
      <GlobalStyle />
      <Head>
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