import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import * as Style from "../Admin.styles";
import type { Resume } from "./ResumeSection";

ReactModal.setAppElement("body");

interface ResumeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: Resume | null;
  onSave: (resume: Resume) => void;
}

export default function ResumeEditModal({
  isOpen,
  onClose,
  resume,
  onSave
}: ResumeEditModalProps) {
  const [formData, setFormData] = useState<Resume>({
    id: 0,
    content: ""
  });

  useEffect(() => {
    if (resume) {
      setFormData({
        id: resume.id ?? 0,
        content: resume.content ?? ""
      });
    }
  }, [resume]);

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
        <h3>이력서 수정</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
          ×
        </button>
      </Style.ModalHeader>
      <form onSubmit={handleSubmit}>
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

