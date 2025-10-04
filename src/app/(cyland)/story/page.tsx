import StoryBody from "components/RightBody/StorySection/StoryBody";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story",
  description: "개발자가 되기로 결심한 계기, 가슴이 따뜻한 개발자"
};

export default function Story() {
  return <StoryBody />;
}
