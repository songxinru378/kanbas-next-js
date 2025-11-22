"use client";
import Link from "next/link";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentListControlButtons from "./AssignmentListControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import { PiNotePencilLight } from "react-icons/pi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { useState, useEffect } from "react";
import { setAssignments } from "./reducer";
import * as client from "../../client";


export default function Assignments() {
    const { cid } = useParams();
    const router = useRouter();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = !!currentUser && (currentUser as any).role === "FACULTY";
    const dispatch = useDispatch();
    const handleAddAssignment = () => {
        router.push(`/Courses/${cid}/Assignments/new`);
    }
    const fetchAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    }

    useEffect (() => {
        fetchAssignments();
    }, [cid] );

    const onRemoveAssignment = async (assignmentId:string) => {
        await client.deleteAssignment(assignmentId);
        dispatch(setAssignments(assignments.filter((assignment: any) => assignment._id !== assignmentId)));
    }


  return (
    <div id="wd-assignments">
        {isFaculty &&
      <AssignmentsControls addAssignment={handleAddAssignment}/>} <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
        <div className="wd-assignments-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3" /><MdOutlineArrowDropDown className="me-2 fs-3" />
        ASSIGNMENTS <AssignmentsControlButtons/>
        <span className="small ms-2 border border-dark rounded-5 px-2 py-1 float-end">
                40% of Total
              </span> </div>
        <ListGroup className="wd-assignment-list rounded-0">
            {assignments
            .map(assignment => (
        <ListGroupItem key={assignment._id} className="wd-assignment-list-item p-3 ps-1">
            <div className="d-flex">
            <BsGripVertical className="me-2 fs-3" /><PiNotePencilLight className="me-2 fs-3" color="green" />
            <div className="flex-grow-1">
          <Link href={`/Courses/${cid}/Assignments/${assignment._id}`}
             className="wd-assignment-link" >
            {assignment.title} </Link>
            <div className="small text-secondary mt-1">
                <Link href={`/Courses/${cid}/Assignments/${assignment._id}`} 
                className="text-danger">Multiple Modules</Link>
                {(assignment.availableFrom || assignment.due || typeof assignment.points === "number") && (
                    <span className="mx-2">|</span>
                )}
                {assignment.availableFrom && (
                    <>
                    <span className="fw-semibold">Not Available until </span>
                    <span>{assignment.availableFrom}</span>
                    </>
                )}
                {assignment.due && (
                    <>
                    <span className="mx-2">|</span>
                    <span className="fw-semibold">Due </span>
                    <span>{assignment.due}</span>
                    </>
                )}
                {assignment.points && (
                    <>
                    <span className="mx-2">|</span>
                    <span>{assignment.points}pts</span>
                    </>
                )}
                
                
                </div>
                </div>
                {isFaculty && (
                <AssignmentListControlButtons assignmentId={assignment._id} deleteAssignment={(assignmentId: string) => {
                            const ok = window.confirm("Are you sure you want to remove this assignment?");
                            if (!ok) return;
                            onRemoveAssignment(assignmentId);
                        } } />
                    )}
                </div>
          </ListGroupItem>
  ))}
        </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
);}
