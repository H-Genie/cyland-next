import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import * as Style from "../Admin.styles";
import type { Portfolio } from "../sections/PortfolioSection";

ReactModal.setAppElement("body");

interface PortfolioEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: Portfolio | null;
  onSave: (portfolio: Portfolio) => void;
  isNew?: boolean;
}

export default function PortfolioEditModal({
  isOpen,
  onClose,
  portfolio,
  onSave,
  isNew = false
}: PortfolioEditModalProps) {
  const [formData, setFormData] = useState<Portfolio>({
    id: "",
    name: "",
    link: "",
    thumbnail: "",
    thumbnail_delete_url: "",
    order: undefined,
    classification: "1",
    language: "",
    description: "",
    study: "",
    range: "",
    sublink: {},
    active: true
  });

  const [sublinkEntries, setSublinkEntries] = useState<
    Array<{ key: string; value: string }>
  >([]);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) {
      setFormData({
        id: "",
        name: "",
        link: "",
        thumbnail: "",
        thumbnail_delete_url: "",
        order: undefined,
        classification: "1",
        language: "",
        description: "",
        study: "",
        range: "",
        sublink: {},
        active: true
      });
      setSublinkEntries([{ key: "", value: "" }]);
      setThumbnailError(null);
    } else if (portfolio) {
      setFormData({
        id: portfolio.id ?? "",
        name: portfolio.name ?? "",
        link: portfolio.link ?? "",
        thumbnail: portfolio.thumbnail ?? "",
        thumbnail_delete_url: portfolio.thumbnail_delete_url ?? "",
        order: portfolio.order != null ? Number(portfolio.order) : undefined,
        classification: portfolio.classification ?? "1",
        language: portfolio.language ?? "",
        description: portfolio.description ?? "",
        study: portfolio.study ?? "",
        range: portfolio.range ?? "",
        sublink: portfolio.sublink ?? {},
        active: portfolio.active ?? true
      });
      // sublink 객체를 배열로 변환
      const sublinkArray = portfolio.sublink
        ? Object.entries(portfolio.sublink).map(([key, value]) => ({
            key,
            value
          }))
        : [];
      setSublinkEntries(
        sublinkArray.length > 0 ? sublinkArray : [{ key: "", value: "" }]
      );
      setThumbnailError(null);
    }
  }, [portfolio, isNew]);

  const handleThumbnailFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      setThumbnailError("이미지 파일을 선택해주세요.");
      return;
    }
    setThumbnailError(null);
    setThumbnailUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);
      if (file.name) formDataUpload.append("name", file.name);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formDataUpload
      });

      const data = await res.json();

      if (!res.ok) {
        setThumbnailError(data?.error ?? "이미지 업로드에 실패했습니다.");
        setThumbnailUploading(false);
        return;
      }

      // imgBB 응답: data.display_url(직접 링크), data.delete_url(삭제용)
      if (data.success && data.url) {
        setFormData(prev => ({
          ...prev,
          thumbnail: data.url,
          thumbnail_delete_url: data.deleteUrl ?? ""
        }));
      }
    } catch (err) {
      setThumbnailError("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setThumbnailUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // sublink 배열을 객체로 변환
    const sublinkObj: { [key: string]: string } = {};
    sublinkEntries.forEach(entry => {
      if (entry.key.trim() && entry.value.trim()) {
        sublinkObj[entry.key.trim()] = entry.value.trim();
      }
    });

    const portfolioData: Portfolio = {
      ...formData,
      sublink: sublinkObj
    };

    onSave(portfolioData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "order" ? (value === "" ? undefined : Number(value)) : value
    }));
  };

  const handleSublinkChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newEntries = [...sublinkEntries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setSublinkEntries(newEntries);
  };

  const addSublinkEntry = () => {
    setSublinkEntries([...sublinkEntries, { key: "", value: "" }]);
  };

  const removeSublinkEntry = (index: number) => {
    setSublinkEntries(sublinkEntries.filter((_, i) => i !== index));
  };

  const modalStyle: ReactModal.Styles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: 1000
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "20px",
      padding: "30px",
      background: "white",
      maxWidth: "800px",
      width: "90%",
      maxHeight: "90vh",
      overflow: "auto"
    }
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <Style.ModalHeader>
        <h3>{isNew ? "새 포트폴리오 추가" : "포트폴리오 수정"}</h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer"
          }}
        >
          ×
        </button>
      </Style.ModalHeader>
      <form onSubmit={handleSubmit}>
        <Style.ModalFormGroup>
          <label>이름 *</label>
          <Style.ModalInput
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </Style.ModalFormGroup>

        <Style.ModalFormGroup>
          <label>링크 *</label>
          <Style.ModalInput
            type="url"
            name="link"
            value={formData.link || ""}
            onChange={handleChange}
            required
          />
        </Style.ModalFormGroup>

        <Style.ModalFormGroup>
          <label>썸네일 *</label>
          {formData.thumbnail ? (
            <div style={{ marginBottom: 10 }}>
              <img
                src={formData.thumbnail}
                alt="썸네일 미리보기"
                style={{
                  maxWidth: "100%",
                  maxHeight: 200,
                  objectFit: "contain",
                  border: "1px solid #e0e0e0",
                  borderRadius: 8
                }}
              />
              {formData.thumbnail_delete_url ? (
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  <a
                    href={formData.thumbnail_delete_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#85c8f2" }}
                  >
                    imgBB에서 이 이미지 삭제 (새 탭)
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <label
              style={{
                padding: "8px 16px",
                background: thumbnailUploading ? "#ccc" : "#85c8f2",
                color: "white",
                borderRadius: 8,
                cursor: thumbnailUploading ? "not-allowed" : "pointer",
                fontSize: 14
              }}
            >
              {thumbnailUploading ? "업로드 중..." : "이미지 업로드"}
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailFileChange}
                disabled={thumbnailUploading}
                style={{ display: "none" }}
              />
            </label>
            <Style.ModalInput
              type="url"
              name="thumbnail"
              value={formData.thumbnail || ""}
              onChange={handleChange}
              placeholder="또는 직접 링크 입력"
              required
              style={{ flex: 1, minWidth: 200 }}
            />
          </div>
          {thumbnailError && (
            <div style={{ color: "#dc3545", fontSize: 13, marginTop: 6 }}>
              {thumbnailError}
            </div>
          )}
        </Style.ModalFormGroup>

        <Style.ModalFormGroup>
          <label>분류 *</label>
          <Style.ModalSelect
            name="classification"
            value={formData.classification || "1"}
            onChange={handleChange}
            required
          >
            <option value="1">프론트엔드 프로젝트</option>
            <option value="2">백엔드 프로젝트</option>
            <option value="3">풀스택 프로젝트</option>
            <option value="4">퍼블리싱 프로젝트</option>
            <option value="5">실무</option>
          </Style.ModalSelect>
        </Style.ModalFormGroup>

        <Style.ModalFormGroup>
          <label>언어/기술 스택 *</label>
          <Style.ModalInput
            type="text"
            name="language"
            value={formData.language || ""}
            onChange={handleChange}
            required
            placeholder="예: Next.js, Typescript, Firebase"
          />
        </Style.ModalFormGroup>

        <Style.ModalFormGroup>
          <label>설명 *</label>
          <Style.ModalTextarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
            rows={4}
            placeholder="프로젝트 설명을 입력하세요"
          />
        </Style.ModalFormGroup>

        <Style.ModalFormGroup>
          <label>학습 내용</label>
          <Style.ModalTextarea
            name="study"
            value={formData.study || ""}
            onChange={handleChange}
            rows={3}
            placeholder="학습한 내용을 입력하세요"
          />
        </Style.ModalFormGroup>

        <Style.ModalFormGroup>
          <label>범위</label>
          <Style.ModalInput
            type="text"
            name="range"
            value={formData.range || ""}
            onChange={handleChange}
            placeholder="예: 메인 컴포넌트 + 라우터 3"
          />
        </Style.ModalFormGroup>

        <Style.ModalFormGroup>
          <label>
            추가 링크
            <button
              type="button"
              onClick={addSublinkEntry}
              style={{
                marginLeft: "10px",
                padding: "4px 8px",
                background: "#85c8f2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px"
              }}
            >
              + 추가
            </button>
          </label>
          {sublinkEntries.map((entry, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
            >
              <Style.ModalInput
                type="text"
                placeholder="링크 이름 (예: 코드)"
                value={entry.key}
                onChange={e =>
                  handleSublinkChange(index, "key", e.target.value)
                }
                style={{ flex: 1 }}
              />
              <Style.ModalInput
                placeholder="URL"
                value={entry.value}
                onChange={e =>
                  handleSublinkChange(index, "value", e.target.value)
                }
                style={{ flex: 2 }}
              />
              {sublinkEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSublinkEntry(index)}
                  style={{
                    padding: "4px 8px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  삭제
                </button>
              )}
            </div>
          ))}
        </Style.ModalFormGroup>

        <Style.ModalFormGroup>
          <label>순서</label>
          <Style.ModalInput
            type="number"
            name="order"
            value={
              formData.order !== undefined && formData.order !== null
                ? formData.order
                : ""
            }
            onChange={handleChange}
            placeholder="클수록 앞에 표시"
            min={0}
          />
        </Style.ModalFormGroup>

        <Style.ModalButtonGroup>
          <Style.ModalButton type="button" onClick={onClose}>
            취소
          </Style.ModalButton>
          <Style.ModalButton type="submit" primary>
            저장
          </Style.ModalButton>
        </Style.ModalButtonGroup>
      </form>
    </ReactModal>
  );
}
