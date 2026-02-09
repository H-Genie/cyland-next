"use client";
import { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const UploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #667eea;
    background: #f0f0f0;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background: #5568d3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PreviewArea = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

const UrlDisplay = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
  word-break: break-all;
`;

const UrlLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
`;

const UrlInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const CopyButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: #218838;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
`;

const SuccessMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-radius: 4px;
  border: 1px solid #c3e6cb;
`;

export default function ImageUploadTestPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("이미지 파일만 업로드할 수 있습니다.");
        return;
      }
      setSelectedFile(file);
      setError(null);
      setSuccess(null);
      setUploadedUrl(null);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("파일을 선택해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("name", selectedFile.name);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "이미지 업로드에 실패했습니다.");
      }

      setUploadedUrl(data.url);
      setSuccess("이미지가 성공적으로 업로드되었습니다!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = () => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl);
      setSuccess("URL이 클립보드에 복사되었습니다!");
      setTimeout(() => setSuccess(null), 2000);
    }
  };

  return (
    <Container>
      <Title>이미지 업로드 테스트</Title>

      <UploadArea onClick={() => document.getElementById("file-input")?.click()}>
        <FileInput
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
        {selectedFile ? (
          <div>
            <p>선택된 파일: {selectedFile.name}</p>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              크기: {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        ) : (
          <div>
            <p>이미지를 선택하려면 클릭하세요</p>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              또는 파일을 드래그하여 놓으세요
            </p>
          </div>
        )}
      </UploadArea>

      {previewUrl && (
        <PreviewArea>
          <h3>미리보기</h3>
          <ImagePreview>
            <Image
              src={previewUrl}
              alt="미리보기"
              fill
              style={{ objectFit: "contain" }}
            />
          </ImagePreview>
        </PreviewArea>
      )}

      <Button onClick={handleUpload} disabled={!selectedFile || loading}>
        {loading ? "업로드 중..." : "이미지 업로드"}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      {uploadedUrl && (
        <UrlDisplay>
          <UrlLabel>업로드된 이미지 URL:</UrlLabel>
          <UrlInput type="text" value={uploadedUrl} readOnly />
          <CopyButton onClick={handleCopyUrl}>URL 복사</CopyButton>
        </UrlDisplay>
      )}

      {uploadedUrl && (
        <PreviewArea style={{ marginTop: "1rem" }}>
          <h3>업로드된 이미지</h3>
          <ImagePreview>
            <Image
              src={uploadedUrl}
              alt="업로드된 이미지"
              fill
              style={{ objectFit: "contain" }}
            />
          </ImagePreview>
        </PreviewArea>
      )}
    </Container>
  );
}
