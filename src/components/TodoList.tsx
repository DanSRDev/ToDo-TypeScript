import React from "react";
import "./styles.css";
import { TodoText, Actions } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

// interface Props {
//   todos: TodoText[];
//   setTodos: React.Dispatch<React.SetStateAction<TodoText[]>>;
// }

interface Props {
  todos: TodoText[];
  setTodos: React.Dispatch<Actions>;
  completedTodos: TodoText[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<TodoText[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    // <div className="todos">
    //   {todos.map((todo) => (
    //     <SingleTodo
    //       todo={todo}
    //       key={todo.id}
    //       todos={todos}
    //       setTodos={setTodos}
    //     />
    //   ))}
    // </div>
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver?'dragactive':''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index ={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${snapshot.isDraggingOver?'dragcomplete':''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index ={index}
                todo={todo}
                key={todo.id}
                todos={completedTodos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
