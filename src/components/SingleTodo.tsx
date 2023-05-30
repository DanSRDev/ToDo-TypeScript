import React from "react";
import { TodoText } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import TodoList from "./TodoList";
type Props = {
  todo: TodoText;
  todos: TodoText[];
  setTodos: React.Dispatch<React.SetStateAction<TodoText[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {

  const handleDone = (id:number) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, isDone:!todo.isDone} : todo
      )
    );
  }

  return (
    <form className="todos__single">
      {todo.isDone ? (
        <s className="todos__single--text">{todo.todoText}</s>
      ) : (
        <span className="todos__single--text">{todo.todoText}</span>
      )}
      <div>
        <span className="icon">
          <AiFillEdit />
        </span>
        <span className="icon">
          <AiFillDelete />
        </span>
        <span className="icon" onClick={()=> handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
