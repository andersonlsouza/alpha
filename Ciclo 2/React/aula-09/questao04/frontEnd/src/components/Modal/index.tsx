import { useState } from "react";
import "./style.css";

interface PropTypes {
  children: string;
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function Modal({ children, onClose }: PropTypes) {
  function stopPropagation(event: React.MouseEvent<HTMLDivElement>): void {
    event.stopPropagation();
  }

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
}

export function UseModal() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function EasyModal() {
    return (
      isOpen && (
        <Modal onClose={closeModal}>{"Erro na submissão do formulário"}</Modal>
      )
    );
  }

  return [EasyModal, openModal] as [() => JSX.Element, () => void];
}
