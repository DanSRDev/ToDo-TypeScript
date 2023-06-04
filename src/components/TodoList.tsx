import React from "react";
import "./styles.css";
import { TodoText, Actions } from "../model";
import SingleTodo from "./SingleTodo";

// interface Props {
//   todos: TodoText[];
//   setTodos: React.Dispatch<React.SetStateAction<TodoText[]>>;
// }

interface Props {
  todos: TodoText[];
  setTodos: React.Dispatch<Actions>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo
          todo={todo}
          key={todo.id}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
};

export default TodoList;
