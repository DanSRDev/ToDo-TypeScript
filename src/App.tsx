import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { TodoText, Actions } from './model';
import TodoList from './components/TodoList';
import { useReducer } from "react";



const App: React.FC = () => {

  const [todoText, setTodoText] = useState<string>("");
  // const [todos, setTodos] = useState<TodoText[]>([]);

  // const handleAdd = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if(todoText){
  //     setTodos([...todos, {id:Date.now(), todoText, isDone:false}]);
  //     setTodoText("");
  //   }
  // }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(todoText){
      dispatch({type: "add", payload: todoText});
      setTodoText("");
    }
  }

  const TodoReducer = (state: TodoText[], action: Actions) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          { id: Date.now(), todoText: action.payload, isDone: false }
        ];
      case "edit":
        return state.map((todo) => 
          todo.id === action.id ? { ...todo, todoText: action.payload } : todo
        );
      case "remove":
        return state.filter((todo) => todo.id !== action.payload);
      case "done":
        return state.map((todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        );
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(TodoReducer, []);

  console.log(state);
  
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todoText={todoText} setTodoText={setTodoText} handleAdd={handleAdd}/>
      {/* <TodoList todos={todos} setTodos={setTodos}/> */}
      <TodoList todos={state} setTodos={dispatch}/>
    </div>
  );
}

export default App;
