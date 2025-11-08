"use client";
import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo,  }: {
  todo: { id: string; title: string };
  
}) {
    const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id} className="d-flex align-items-center">
        {todo.title}  
        <div className="ms-auto d-flex flex-nowrap">
            <Button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click" className="me-2"> Edit </Button>
      <Button variant="danger" onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click" className="me-2"> Delete </Button>
      </div>
      </ListGroupItem>);}