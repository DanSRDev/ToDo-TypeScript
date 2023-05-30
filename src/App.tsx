import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { TodoText } from './model';
import TodoList from './components/TodoList';


const App: React.FC = () => {

  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<TodoText[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(todoText){
      setTodos([...todos, {id:Date.now(), todoText, isDone:false}]);
      setTodoText("");
    }
  }

  console.log(todos);
  
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todoText={todoText} setTodoText={setTodoText} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
