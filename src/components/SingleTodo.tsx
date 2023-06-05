import React, { useEffect, useRef, useState } from "react";
import { TodoText, Actions } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: TodoText;
  todos: TodoText[];
  setTodos: React.Dispatch<Actions>;
  setOthers: React.Dispatch<Actions>;
};

const SingleTodo = ({ index, todo, todos, setTodos, setOthers }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todoText);

  const handleDone = (id: number) => {
    setTodos({ type: "done", payload: id, setOthers: setOthers });
  };

  const handleDelete = (id: number) => {
    setTodos({ type: "remove", payload: id });
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos({ type: "edit", id: id, payload: editTodo });
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
              className={`icon ${todo.isDone ? 'inactive' : ''}`}
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
      )}
    </Draggable>
  );
};

export default SingleTodo;
