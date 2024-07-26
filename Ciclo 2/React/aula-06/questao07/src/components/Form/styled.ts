import styled from "styled-components";

export const Container = styled.div`
  font-weight: bold;

  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 15px;
    padding: 20px;
  }

  input {
    padding: 5px;
  }

  button {
    color: white;
    background-color: #21b921;
  }
  button: hover {
    background-color: #8ac78a;
  }
`;
