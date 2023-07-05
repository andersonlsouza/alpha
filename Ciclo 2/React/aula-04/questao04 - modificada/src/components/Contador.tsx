import { useState } from "react";

interface PropTypes {
  onRemove: () => void;
  name: string;
}

export function Contador({ onRemove, name }: PropTypes) {
  const [count, setCount] = useState<number>(0);

  return (
    <li>
      <p>
        {name} : {count}
      </p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={onRemove}>Remover</button>
    </li>
  );
}
