"use client";
import { Route } from "components/RightBody/common/Route";
import Visitor from "components/RightBody/common/Visitor";
import { stories } from "components/RightBody/StorySection/MakeStoryVisitor";

export default function StoryBody() {
  return (
    <>
      <Route>
        {stories.map((story, index) => (
          <Visitor key={index} no={index + 1} contents={story} notice={false} />
        ))}
      </Route>
    </>
  );
}
