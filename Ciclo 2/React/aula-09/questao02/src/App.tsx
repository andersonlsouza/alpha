import { useRef } from "react";

export function App() {
  const inputFocus = useRef<HTMLInputElement>(null);

  const focus = () => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  };

  return (
    <div>
      <input type="text" ref={inputFocus} />
      <button onClick={focus}>Focar</button>
    </div>
  );
}
