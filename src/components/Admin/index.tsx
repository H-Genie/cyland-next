"use client";
import { useState, useEffect } from "react";
import * as Style from "./Admin.styles";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("comment");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        {activeTab === "comment" && (
          <Style.CommentSection>
            <Style.SectionHeader>
              <h3>댓글 관리</h3>
            </Style.SectionHeader>
            <Style.DataTable>
              <Style.TableHeader>
                <th>ID</th>
                <th>닉네임</th>
                <th>댓글 내용</th>
                <th>작성일</th>
                <th>작업</th>
              </Style.TableHeader>
              <Style.TableBody>
                <tr>
                  <td>1</td>
                  <td>방문자1</td>
                  <td>좋은 포트폴리오네요!</td>
                  <td>2024-01-15</td>
                  <td>
                    <Style.ActionButton edit>수정</Style.ActionButton>
                    <Style.ActionButton delete>삭제</Style.ActionButton>
                  </td>
                </tr>
              </Style.TableBody>
            </Style.DataTable>
          </Style.CommentSection>
        )}

        {activeTab === "resume" && (
          <Style.ResumeSection>
            <Style.SectionHeader>
              <h3>이력서 관리</h3>
              <Style.AddButton>새 이력서 추가</Style.AddButton>
            </Style.SectionHeader>
            <Style.DataTable>
              <Style.TableHeader>
                <th>ID</th>
                <th>제목</th>
                <th>분류</th>
                <th>상태</th>
                <th>작업</th>
              </Style.TableHeader>
              <Style.TableBody>
                <tr>
                  <td>1</td>
                  <td>프론트엔드 개발자 이력서</td>
                  <td>개발</td>
                  <td>
                    <Style.StatusBadge active>활성</Style.StatusBadge>
                  </td>
                  <td>
                    <Style.ActionButton edit>수정</Style.ActionButton>
                    <Style.ActionButton delete>삭제</Style.ActionButton>
                  </td>
                </tr>
              </Style.TableBody>
            </Style.DataTable>
          </Style.ResumeSection>
        )}

        {activeTab === "portfolio" && (
          <Style.PortfolioSection>
            <Style.SectionHeader>
              <h3>포트폴리오 관리</h3>
              <Style.AddButton>새 포트폴리오 추가</Style.AddButton>
            </Style.SectionHeader>
            <Style.DataTable>
              <Style.TableHeader>
                <th>ID</th>
                <th>제목</th>
                <th>분류</th>
                <th>상태</th>
                <th>작업</th>
              </Style.TableHeader>
              <Style.TableBody>
                <tr>
                  <td>1</td>
                  <td>COVID-19 대시보드</td>
                  <td>웹 개발</td>
                  <td>
                    <Style.StatusBadge active>활성</Style.StatusBadge>
                  </td>
                  <td>
                    <Style.ActionButton edit>수정</Style.ActionButton>
                    <Style.ActionButton delete>삭제</Style.ActionButton>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Netflix 클론</td>
                  <td>웹 개발</td>
                  <td>
                    <Style.StatusBadge active>활성</Style.StatusBadge>
                  </td>
                  <td>
                    <Style.ActionButton edit>수정</Style.ActionButton>
                    <Style.ActionButton delete>삭제</Style.ActionButton>
                  </td>
                </tr>
              </Style.TableBody>
            </Style.DataTable>
          </Style.PortfolioSection>
        )}

        {activeTab === "story" && (
          <Style.StorySection>
            <Style.SectionHeader>
              <h3>스토리 관리</h3>
              <Style.AddButton>새 스토리 추가</Style.AddButton>
            </Style.SectionHeader>
            <Style.DataTable>
              <Style.TableHeader>
                <th>ID</th>
                <th>내용</th>
                <th>작성일</th>
                <th>작업</th>
              </Style.TableHeader>
              <Style.TableBody>
                <tr>
                  <td>1</td>
                  <td>여행 스토리 내용...</td>
                  <td>2024-01-15</td>
                  <td>
                    <Style.ActionButton edit>수정</Style.ActionButton>
                    <Style.ActionButton delete>삭제</Style.ActionButton>
                  </td>
                </tr>
              </Style.TableBody>
            </Style.DataTable>
          </Style.StorySection>
        )}
      </Style.AdminContent>
    </Style.AdminContainer>
  );
}
