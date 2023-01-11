import React from 'react';
import Head from 'next/head';
import { Section } from '../../style/Router';
import Visitor from '../../components/RightInterior/Visitor/Visitor';
import * as contents from '../../components/RightInterior/contents/portfolioContents';
import { CarouselPortfolio } from '../../utils/useCarousel';

const Portfolio = () => {
  const notice = (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <br />
      <p>풀스택 프로젝트 1개, 프론트엔드 프로젝트 4개, 퍼블리싱 프로젝트 5개, 실무 1개, </p>
      <br />
      <CarouselPortfolio />
      <br />
    </>
  );

  return (
    <Section>
      <Visitor no={0} content={notice} notice={true} />
      {
        Object.values(contents).map((portfolio, index) => (
          <Visitor
            key={index + 1}
            no={index + 1}
            content={portfolio}
            type={"portfolio"}
          />
        ))
      }
    </Section>
  )
}

export default Portfolio;