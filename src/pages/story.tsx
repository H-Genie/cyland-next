import Head from "next/head";

import { Route } from "components/RightBody/Route";
import Visitor from "components/RightBody/Visitor";
import { stories } from "components/RightBody/StorySection/MakeStoryVisitor";

export default function Story() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="개발자가 되기로 결심한 계기, 가슴이 따뜻한 개발자"
        />
        <title>Story</title>
      </Head>
      <Route>
        {stories.map((story, index) => (
          <Visitor key={index} no={index + 1} contents={story} notice={false} />
        ))}
      </Route>
    </>
  );
}
