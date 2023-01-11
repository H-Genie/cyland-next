import React from 'react'
import Head from 'next/head';
import Image from 'next/image';
import CommentContainer from '../Components/RightInterior/Home/CommentContainer';

const index = () => {
  return (
    <>
      <Head>
        <title>H-Genie.com</title>
      </Head>
      <Image src={"/images/miniroom.jpg"} alt="miniroom" width={747} height={346} style={{ marginBottom: 10 }} />
      <CommentContainer />
    </>
  )
}

export default index