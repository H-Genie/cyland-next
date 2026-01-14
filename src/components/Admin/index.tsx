"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Style from "./Admin.styles";
import CommentSection from "./sections/CommentSection";
import ResumeSection from "./sections/ResumeSection";
import PortfolioSection from "./sections/PortfolioSection";
import StorySection from "./sections/StorySection";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("comment");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST"
      });

      if (response.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
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
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            background: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.875rem"
          }}
        >
          로그아웃
        </button>
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
