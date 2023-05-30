import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todoText: string;
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todoText, setTodoText, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="input" onSubmit={(e) => {
      handleAdd(e);
      inputRef.current?.blur()
    }}>
      <input
        ref={inputRef}
        type="input"
        className="input__box"
        placeholder="Enter a task"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
