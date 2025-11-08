"use client";
import { useState } from "react";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
         <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />
        ))}


        {/*<ListGroupItem className="d-flex align-items-center">
          <FormControl className="me-2" value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}/>
        <div className="ms-auto flex-nowrap d-flex">
          <Button className="me-2" variant="warning" onClick={() => updateTodo(todo)}
                  id="wd-update-todo-click"> Update </Button>
          <Button className="me-2" variant="success" onClick={() => addTodo(todo)}
                  id="wd-add-todo-click"> Add </Button>
          </div>
        </ListGroupItem>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} className="d-flex align-items-center">
            {todo.title}
            <div className="ms-auto">
                <Button className="me-2" variant="primary" onClick={() => setTodo(todo)}
                    id="wd-set-todo-click"> Edit </Button>
                <Button className="me-2" variant="danger" onClick={() => deleteTodo(todo.id)}
                    id="wd-delete-todo-click"> Delete </Button>
            
            </div>
          </ListGroupItem>
        ))}*/}
      </ListGroup><hr/>
</div>);}