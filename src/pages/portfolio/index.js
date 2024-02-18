import React from "react";
import Head from "next/head";
import { Section } from "style/Router";
import Visitor from "components/RightInterior/Visitor/Visitor";
import {
  cyland,
  pagination,
  // pokemon,
  movieapp,
  todo,
  genesis,
  flag,
  huge,
  netflix,
  naver,
  vom,
} from "components/RightInterior/contents/portfolioContents";
import { CarouselPortfolio } from "utils/useCarousel";

const Portfolio = () => {
  const notice = (
    <>
      <Head>
        <meta
          name="description"
          content="프론트엔드 포트폴리오, 리액트 포트폴리오, 퍼블리싱 포트폴리오, 자바스크립트 포트폴리오, HTML 포트폴리오, CSS 포트폴리오, HTML, CSS, JavaScript, React, Node.js, Next.js"
        />
        <title>Portfolio</title>
      </Head>
      <br />
      <p>
        풀스택 프로젝트 1개, 프론트엔드 프로젝트 3개, 퍼블리싱 프로젝트 5개,
        실무 1개,{" "}
      </p>
      <br />
      <CarouselPortfolio />
      <br />
    </>
  );

  const map = new Map();
  map.set(1, cyland);
  map.set(2, pagination);
  // map.set(3, pokemon);
  map.set(4, movieapp);
  map.set(5, todo);
  map.set(6, genesis);
  map.set(7, flag);
  map.set(8, huge);
  map.set(9, netflix);
  map.set(10, naver);
  map.set(11, vom);

  return (
    <Section>
      <Visitor no={0} content={notice} notice={true} />
      {[...map.values()].map((portfolio, index) => (
        <Visitor
          key={index + 1}
          no={index + 1}
          content={portfolio}
          type={"portfolio"}
        />
      ))}
    </Section>
  );
};

export default Portfolio;
