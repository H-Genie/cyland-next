import { Comment } from "./sections/CommentSection";
import { Resume } from "./sections/ResumeSection";
import { Portfolio } from "./sections/PortfolioSection";
import { Story } from "./sections/StorySection";

export const mockComments: Comment[] = [
  {
    id: 1,
    nickname: "방문자1",
    content: "좋은 포트폴리오네요!",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    nickname: "개발자",
    content: "정말 인상적인 프로젝트들이 많네요.",
    createdAt: "2024-01-16"
  },
  {
    id: 3,
    nickname: "디자이너",
    content: "UI/UX 디자인이 깔끔하네요!",
    createdAt: "2024-01-17"
  }
];

export const mockResumes: Resume[] = [
  {
    id: 1,
    title: "프론트엔드 개발자 이력서",
    category: "개발",
    status: true
  },
  {
    id: 2,
    title: "풀스택 개발자 이력서",
    category: "개발",
    status: true
  },
  {
    id: 3,
    title: "UI/UX 디자이너 이력서",
    category: "디자인",
    status: false
  }
];

export const mockPortfolios: Portfolio[] = [
  {
    id: 1,
    title: "COVID-19 대시보드",
    category: "웹 개발",
    status: true
  },
  {
    id: 2,
    title: "Netflix 클론",
    category: "웹 개발",
    status: true
  },
  {
    id: 3,
    title: "Pokemon API 프로젝트",
    category: "웹 개발",
    status: true
  },
  {
    id: 4,
    title: "Todo 앱",
    category: "모바일",
    status: false
  }
];

export const mockStories: Story[] = [
  {
    id: 1,
    content: "여행 스토리 내용...",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    content: "개발 경험담...",
    createdAt: "2024-01-16"
  },
  {
    id: 3,
    content: "새로운 기술 학습기...",
    createdAt: "2024-01-17"
  }
];
