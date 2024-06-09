import { Dispatch, SetStateAction } from "react";
import ReactModal, { Styles } from "react-modal";

type contentProps = {
  content: JSX.Element[];
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};

ReactModal.setAppElement("body");

export default function Modal({ content, modal, setModal }: contentProps) {
  const style: Styles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: "1"
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      padding: 0,
      marginBottom: -1,
      background: "transparent",
      maxWidth: 1280,
      maxHeight: "80%",
      width: "fit-content",
      height: "fit-content"
    }
  };

  return (
    <ReactModal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      style={style}
    >
      {content}
    </ReactModal>
  );
}
