import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { TodoText, Actions } from "./model";
import TodoList from "./components/TodoList";
import { useReducer } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todoText, setTodoText] = useState<string>("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoText) {
      dispatch({ type: "add", payload: todoText, done: false });
      setTodoText("");
    }
  };

  const TodoReducer = (state: TodoText[], action: Actions) => {
    switch (action.type) {
      case "set":
        return action.payload;
      case "add":
        return [
          ...state,
          { id: Date.now(), todoText: action.payload, isDone: action.done },
        ];
      case "edit":
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, todoText: action.payload } : todo
        );
      case "remove":
        return state.filter((todo) => todo.id !== action.payload);
      case "done":
        state.forEach((todo) => {
          if(todo.id === action.payload) {
            action.setOthers({type: 'add', payload: todo.todoText, done: !todo.isDone})
          }
        })
        return state.filter((todo) => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(TodoReducer, []);
  const [completedState, completedDispatch] = useReducer(TodoReducer, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    
    let add,
      active = state,
      complete= completedState;

    if(source.droppableId==='TodosList') {
      add=active[source.index];
      add.isDone = !add.isDone;
      active.splice(source.index, 1);
    } else {
      add=complete[source.index];
      add.isDone = !add.isDone;
      complete.splice(source.index, 1);
    }

    if(destination.droppableId==='TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    dispatch({type : 'set', payload: active})
    completedDispatch({type : 'set', payload: complete})
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField
          todoText={todoText}
          setTodoText={setTodoText}
          handleAdd={handleAdd}
        />
        <TodoList
          todos={state}
          setTodos={dispatch}
          completedTodos={completedState}
          setCompletedTodos={completedDispatch}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
