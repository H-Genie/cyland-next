"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: -8px;
`;

const LoginBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #5568d3;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 클라이언트에서만 URL 파라미터 읽기
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get("callbackUrl") || "/admin";
      
      // 이미 로그인되어 있는지 확인
      checkAuth(callbackUrl);
    }
  }, []);

  const checkAuth = async (callbackUrl: string) => {
    try {
      const response = await fetch("/api/auth/check");
      const data = await response.json();
      
      if (data.authenticated) {
        router.push(callbackUrl);
      }
    } catch (err) {
      // 인증 확인 실패 시 로그인 페이지 유지
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "로그인에 실패했습니다.");
        setLoading(false);
        return;
      }

      // 로그인 성공
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get("callbackUrl") || "/admin";
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>관리자 로그인</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="사용자명"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </Form>
      </LoginBox>
    </LoginContainer>
  );
}
