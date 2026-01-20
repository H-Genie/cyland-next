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
    classification: "1",
    language: "",
    description: "",
    study: "",
    range: "",
    sublink: {},
    active: true
  });

  const [sublinkEntries, setSublinkEntries] = useState<Array<{ key: string; value: string }>>([]);

  useEffect(() => {
    if (isNew) {
      setFormData({
        id: "",
        name: "",
        link: "",
        thumbnail: "",
        classification: "1",
        language: "",
        description: "",
        study: "",
        range: "",
        sublink: {},
        active: true
      });
      setSublinkEntries([{ key: "", value: "" }]);
    } else if (portfolio) {
      setFormData({
        id: portfolio.id ?? "",
        name: portfolio.name ?? "",
        link: portfolio.link ?? "",
        thumbnail: portfolio.thumbnail ?? "",
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
        ? Object.entries(portfolio.sublink).map(([key, value]) => ({ key, value }))
        : [];
      setSublinkEntries(sublinkArray.length > 0 ? sublinkArray : [{ key: "", value: "" }]);
    }
  }, [portfolio, isNew]);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSublinkChange = (index: number, field: "key" | "value", value: string) => {
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
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
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
          <label>썸네일 경로 *</label>
          <Style.ModalInput
            type="text"
            name="thumbnail"
            value={formData.thumbnail || ""}
            onChange={handleChange}
            required
          />
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
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <Style.ModalInput
                type="text"
                placeholder="링크 이름 (예: 코드)"
                value={entry.key}
                onChange={e => handleSublinkChange(index, "key", e.target.value)}
                style={{ flex: 1 }}
              />
              <Style.ModalInput
                placeholder="URL"
                value={entry.value}
                onChange={e => handleSublinkChange(index, "value", e.target.value)}
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
