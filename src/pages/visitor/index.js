import React from "react";
import Head from "next/head";
import { Section } from "style/Router";
import Utterances from "components/RightInterior/Utterances";

const Visitor = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="GitHub를 이용한 Utterances 댓글, Styling with Markdown is supported"
        />
        <title>Visitor</title>
      </Head>
      <Section>
        <Utterances />
      </Section>
    </>
  );
};

export default Visitor;
