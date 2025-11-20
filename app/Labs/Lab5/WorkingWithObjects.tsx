"use client"
import React, { useState } from "react";
import FormControl from "react-bootstrap/esm/FormControl";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: "MOD123",
    name: "Lab 1: Working With Objects",
    description: "Practice routes for objects",
    course: "CS1234",
  })
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />
      <a id="wd-update-assignment-score"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score </a>
      <FormControl className="w-75" id="wd-assignment-score"
        defaultValue={assignment.score} onChange={(e) =>
          setAssignment({ ...assignment, score: Number(e.target.value) })}/>
      <hr />
      <label className="form-control w-75">
        <a
    id="wd-update-assignment-completed"
    href={`${ASSIGNMENT_API_URL}/completed/${!assignment.completed}`}
    className="w-100 text-decoration-none text-dark"
  >
        <input className="me-2" type="checkbox" checked={assignment.completed}
        onChange={() => {
            setAssignment({
                ...assignment, completed: !assignment.completed,
            });
        }}></input>
        Completed
        </a>
      </label>
      <hr />
      <a id="wd-update-module-name" 
      className="btn btn-primary float-end"
      href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <FormControl className="w-50" id="wd-module-name" 
      defaultValue={module.name} onChange={(e) => setModule({...module, name: e.target.value})}
      /><hr/>
      <a
        id="wd-update-module-description"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>
      <FormControl
        className="w-50"
        id="wd-module-description"
        defaultValue={module.description}
        onChange={(e) =>
          setModule({ ...module, description: e.target.value })
        }
      />
      <hr />
    

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a>
      <a id="wd-get-module"
         className="btn btn-primary me-2"
         href={`${HTTP_SERVER}/lab5/module`}>
        Get Module </a><hr/>
        <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a>
      <a
        id="wd-get-module-name"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a><hr/>
      
    </div>
);}
