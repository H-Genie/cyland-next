import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import * as Style from "../Admin.styles";

ReactModal.setAppElement("body");

interface ContentItem {
  id?: number;
  name?: string;
  content?: string;
  [key: string]: any;
}

interface ContentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ContentItem | null;
  onSave: (item: ContentItem) => void;
  isNew?: boolean;
  title: string; // "이력서" 또는 "스토리" 등
}

export default function ContentEditModal({
  isOpen,
  onClose,
  item,
  onSave,
  isNew = false,
  title
}: ContentEditModalProps) {
  const [formData, setFormData] = useState<ContentItem>({
    id: 0,
    name: "",
    content: ""
  });

  useEffect(() => {
    if (isNew) {
      setFormData({
        id: 0,
        name: "",
        content: ""
      });
    } else if (item) {
      setFormData({
        id: item.id ?? 0,
        name: item.name ?? "",
        content: item.content ?? ""
      });
    }
  }, [item, isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      maxWidth: "600px",
      width: "90%",
      maxHeight: "80vh",
      overflow: "auto"
    }
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <Style.ModalHeader>
        <h3>{isNew ? `새 ${title} 추가` : `${title} 수정`}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
          ×
        </button>
      </Style.ModalHeader>
      <form onSubmit={handleSubmit}>
        <Style.ModalFormGroup>
          <label>이름</label>
          <Style.ModalInput
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            required
          />
        </Style.ModalFormGroup>
        <Style.ModalFormGroup>
          <label>내용</label>
          <Style.ModalTextarea
            name="content"
            value={formData.content || ""}
            onChange={handleChange}
            required
            rows={10}
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

