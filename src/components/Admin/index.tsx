"use client";
import { useState, useEffect } from "react";
import * as Style from "./Admin.styles";
import CommentSection from "./sections/CommentSection";
import ResumeSection, { Resume } from "./sections/ResumeSection";
import PortfolioSection, { Portfolio } from "./sections/PortfolioSection";
import StorySection, { Story } from "./sections/StorySection";
import { mockResumes, mockPortfolios, mockStories } from "./data";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("comment");
  const [isClient, setIsClient] = useState(false);

  // 상태 관리 - 나중에 API에서 가져올 데이터
  const [resumes, setResumes] = useState<Resume[]>(mockResumes);
  const [portfolios, setPortfolios] = useState<Portfolio[]>(mockPortfolios);
  const [stories, setStories] = useState<Story[]>(mockStories);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 데이터 변경 핸들러들
  const handleResumesChange = (newResumes: Resume[]) => {
    setResumes(newResumes);
  };

  const handlePortfoliosChange = (newPortfolios: Portfolio[]) => {
    setPortfolios(newPortfolios);
  };

  const handleStoriesChange = (newStories: Story[]) => {
    setStories(newStories);
  };

  if (!isClient) {
    return (
      <Style.AdminContainer>
        <Style.AdminHeader>
          <h2>관리자 대시보드</h2>
        </Style.AdminHeader>
      </Style.AdminContainer>
    );
  }

  return (
    <Style.AdminContainer>
      <Style.AdminHeader>
        <h2>관리자 대시보드</h2>
      </Style.AdminHeader>

      <Style.AdminTabs>
        <Style.TabButton
          active={activeTab === "comment"}
          onClick={() => setActiveTab("comment")}
        >
          댓글 관리
        </Style.TabButton>
        <Style.TabButton
          active={activeTab === "resume"}
          onClick={() => setActiveTab("resume")}
        >
          이력서 관리
        </Style.TabButton>
        <Style.TabButton
          active={activeTab === "portfolio"}
          onClick={() => setActiveTab("portfolio")}
        >
          포트폴리오 관리
        </Style.TabButton>
        <Style.TabButton
          active={activeTab === "story"}
          onClick={() => setActiveTab("story")}
        >
          스토리 관리
        </Style.TabButton>
      </Style.AdminTabs>

      <Style.AdminContent>
        {activeTab === "comment" && <CommentSection />}

        {activeTab === "resume" && <ResumeSection />}

        {activeTab === "portfolio" && <PortfolioSection />}

        {activeTab === "story" && <StorySection />}
      </Style.AdminContent>
    </Style.AdminContainer>
  );
}
