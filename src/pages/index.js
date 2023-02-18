import React from 'react'
import Head from 'next/head';
import CommentContainer from 'components/RightInterior/Home/CommentContainer';

const index = () => {
  return (
    <>
      <Head>
        <title>H-Genie.com</title>
      </Head>
      <img src={"/images/miniroom.jpg"} alt="miniroom" style={{ marginBottom: 10, width: '100%', height: 350 }} />
      <CommentContainer />
    </>
  )
}

export default index