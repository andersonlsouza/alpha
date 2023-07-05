import "./Modal.css";

interface PropTypes {
  children: string;
}

export function Modal({ children }: PropTypes) {
  function closeModal() {
    alert("Na próxima aula, clicar aqui vai fechar o modal!");
  }

  function stopPropagation(event: React.MouseEvent<HTMLDivElement>): void {
    event.stopPropagation();
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
}
