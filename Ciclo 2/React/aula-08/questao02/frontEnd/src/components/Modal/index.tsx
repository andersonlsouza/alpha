import "./style.css";

interface PropTypes {
  children: string;
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Modal({ children, onClose }: PropTypes) {
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
