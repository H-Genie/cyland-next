import { useState } from "react";
import Modal from "../Modal";

type PortfolioModalProps = {
  projectName: string;
  imageIndex: number;
  linkTitle?: string;
};

export default function MakePortfolioModal({
  projectName,
  imageIndex,
  linkTitle
}: PortfolioModalProps) {
  let images: JSX.Element[] = [];
  for (let i = 0; i < imageIndex; i++) {
    images.push(
      <img
        src={`./images/portfolio/${projectName}-modal-${i + 1}.jpg`}
        style={{ width: "100%", maxWidth: "-webkit-fill-available" }}
      />
    );
  }

  const [modal, setModal] = useState(false);

  return (
    <>
      <p
        onClick={() => setModal(true)}
        style={{ cursor: "pointer" }}
      >{`<${linkTitle}>`}</p>
      <Modal content={images} modal={modal} setModal={setModal} />
    </>
  );
}
