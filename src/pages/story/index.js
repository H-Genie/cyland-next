import React from 'react';
import Head from 'next/head';
import { Section } from '../../style/Router'
import Visitor from '../../components/RightInterior/Visitor/Visitor';
import * as stories from '../../components/RightInterior/contents/storyContents';

const Story = () => {
  return (
    <>
      <Head>
        <title>Story</title>
      </Head>
      <Section>
        {
          Object.values(stories).map((story, index) => (
            <Visitor
              key={index + 1}
              no={index + 1}
              content={story}
            />
          ))
        }
      </Section>
    </>
  )
}

export default Story;