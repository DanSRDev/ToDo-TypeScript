import React, { useEffect, useRef, useState } from "react";
import { TodoText, Actions } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

// type Props = {
//   todo: TodoText;
//   todos: TodoText[];
//   setTodos: React.Dispatch<React.SetStateAction<TodoText[]>>;
// };

type Props = {
  todo: TodoText;
  todos: TodoText[];
  setTodos: React.Dispatch<Actions>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todoText);

  // const handleDone = (id: number) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
  //     )
  //   );
  // };

  const handleDone = (id: number) => {
    setTodos({type: "done", payload: id});
  };

  // const handleDelete = (id: number) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  const handleDelete = (id: number) => {
    setTodos({type: "remove", payload: id});
  };

  // const handleEdit = (e: React.FormEvent, id: number) => {
  //   e.preventDefault();
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, todoText: editTodo } : todo
  //     )
  //   );
  //   setEdit(false);
  // };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos({type: "edit", id: id, payload: editTodo});
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todoText}</s>
      ) : (
        <span className="todos__single--text">{todo.todoText}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
