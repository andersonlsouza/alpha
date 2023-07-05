interface PropTypes {
  onSubmit: (event: React.MouseEvent) => void;
}

export function Form({ onSubmit }: PropTypes) {
  return (
    <form>
      <p>Email</p>
      <input type="email" />
      <p>Senha</p>
      <input type="password" />
      <br />
      <button onClick={onSubmit}>Enviar</button>
    </form>
  );
}
