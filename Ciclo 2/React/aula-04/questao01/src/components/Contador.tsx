import { useState } from "react";

export function Contador() {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  );
}
