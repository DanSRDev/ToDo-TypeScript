import React from 'react';
import './styles.css';
import { TodoText } from '../model';

interface Props {
    todos: TodoText[] ;
    setTodos: React.Dispatch<React.SetStateAction<TodoText[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos}) => {
  return <div className='todos'>
        {todos.map ((todo) => (
            <li>{todo.todoText}</li>
        ))}
    </div>
};

export default TodoList;