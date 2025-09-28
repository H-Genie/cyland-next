"use client";
import { Route } from "components/RightBody/common/Route";
import styled from "@emotion/styled";
import Visitor from "components/RightBody/common/Visitor";
import { useStory } from "hooks/queries/useStory";
import Loader from "styles/Loader";
import ReactJsxParser from "react-jsx-parser";
import MakeStoryCarousel from "components/RightBody/StorySection/MakeStoryCarousel";

export const Paragraph = styled.p`
  font-family: "S-CoreDream-3Light";
  font-size: 20px;
  line-height: 32px;

  span {
    font-size: 22px;
    font-family: "S-CoreDream-5Medium";
  }
`;

export const BoxShadow = styled.div`
  width: fit-content;
  border: 1px solid rgb(108, 108, 108);
  padding: 10px;
  box-shadow: 10px 10px rgb(108, 108, 108);

  font-family: "SCDream3";
  font-size: 20px;
  line-height: 32px;
`;

export const Running = styled.div`
  width: 480px;
  display: flex;

  img {
    width: 33.3%;
  }
`;

export const Iframe = styled.iframe`
  box-shadow: 10px 10px #a10448;
  border: 5px solid #ec0c6d;
`;

export default function StoryBody() {
  const { data, isLoading, isError } = useStory();

  const components: any = {
    Paragraph,
    BoxShadow,
    Running,
    Iframe,
    MakeStoryCarousel
  };

  if (isLoading) return <Loader.Basic />;
  if (isError) return <div>에러가 발생했습니다. 새로고침 해줏세요.</div>;
  return (
    <>
      <Route>
        {data.map((story: any, index: any) => (
          <Visitor
            key={index}
            no={index + 1}
            contents={
              <ReactJsxParser jsx={story.content} components={components} />
            }
            notice={false}
          />
        ))}
      </Route>
    </>
  );
}
