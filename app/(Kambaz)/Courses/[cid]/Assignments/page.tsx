import Link from "next/link";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentListControlButtons from "./AssignmentListControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import { PiNotePencilLight } from "react-icons/pi";
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentsControls /> <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
        <div className="wd-assignments-title p-3 ps-2 bg-secondary"><BsGripVertical className="me-2 fs-3" /><MdOutlineArrowDropDown className="me-2 fs-3" />
        ASSIGNMENTS <AssignmentsControlButtons/>
        <span className="small ms-2 border border-dark rounded-5 px-2 py-1 float-end">
                40% of Total
              </span> </div>
        <ListGroup className="wd-assignment-list rounded-0">
        <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
            <div className="d-flex">
            <BsGripVertical className="me-2 fs-3" /><PiNotePencilLight className="me-2 fs-3" color="green" />
            <div className="flex-grow-1">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A1 - ENV + HTML </Link>
            <div className="small text-secondary mt-1">
                <Link href="/Courses/1234/Assignments/123" className="text-danger">Multiple Modules</Link>
                <span className="mx-2">|</span>
                <span className="fw-semibold">Not Available until </span> <span>May 6 at 12:00am</span>
                <span className="mx-2">|</span>
                <div>
                <span className="fw-semibold">Due </span><span>May 13 at 11:59pm</span>
                <span className="mx-2">|</span>
                100 Points </div>
                </div>
                </div>
                <AssignmentListControlButtons />
                </div>
          </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
            <div className="d-flex">
            <BsGripVertical className="me-2 fs-3" /><PiNotePencilLight className="me-2 fs-3" color="green" />
            <div className="flex-grow-1">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A2 - CSS + BOOTSTRAP </Link>
            <div className="small text-secondary mt-1">
                <Link href="/Courses/1234/Assignments/123" className="text-danger">Multiple Modules</Link>
                <span className="mx-2">|</span>
                <span className="fw-semibold">Not Available until </span> <span>May 6 at 12:00am</span>
                <span className="mx-2">|</span>
                <div>
                <span className="fw-semibold">Due </span><span>May 13 at 11:59pm</span>
                <span className="mx-2">|</span>
                100 Points </div>
                </div>
                </div>
                <AssignmentListControlButtons />
                </div>
          </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
            <div className="d-flex">
            <BsGripVertical className="me-2 fs-3" /><PiNotePencilLight className="me-2 fs-3" color="green" />
            <div className="flex-grow-1">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A3 - JAVASCRIPT + REACT </Link>
            <div className="small text-secondary mt-1">
                <Link href="/Courses/1234/Assignments/123" className="text-danger">Multiple Modules</Link>
                <span className="mx-2">|</span>
                <span className="fw-semibold">Not Available until </span> <span>May 6 at 12:00am</span>
                <span className="mx-2">|</span>
                <div>
                <span className="fw-semibold">Due </span><span>May 13 at 11:59pm</span>
                <span className="mx-2">|</span>
                100 Points </div>
                </div>
                </div>
                <AssignmentListControlButtons />
                </div>
          </ListGroupItem>
        </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
);}
