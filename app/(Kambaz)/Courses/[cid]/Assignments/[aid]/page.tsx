"use client";
import { Col, FormControl, FormLabel, Row, FormSelect, CardBody, FormCheck, Card, Button, Container } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { useState } from "react";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const {assignments} = useSelector((state:RootState) => state.assignmentsReducer);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = !!currentUser && (currentUser as any).role === "FACULTY";
    const existing = assignments.find((a:any) => a._id === aid);
    const isNew = !existing || aid === "new";
    const [assignment, setAssignment] = useState<any>({
        _id:existing?._id,
        title:existing?.title ??"New Assignment",
        description: existing?.description ??"New Assignment Description",
        points:existing?.points ?? "100",
        dueDate: existing?.dueDate ??"",
        availableDate: existing?.availableDate??"",
        availableUntilDate: existing?.dueDate ??"",
        course: existing?.course ?? cid,
        group: existing?.group ?? "ASSIGNMENTS",
        submissionType: existing?.displayAs ?? "Online",
        displayAs: existing?.displayAs??"Points",
    });
    const updateField = (field:string, value:string) => {
        setAssignment({...assignment, [field]: value});
    };
    const handleSave = () => {
        if (!isFaculty) return;
        const availableFromLabel = assignment.availableDate ? new Date(assignment.availableDate).toLocaleString():"";
        const dueLabel = assignment.dueDate ? new Date(assignment.dueDate).toLocaleString():"";
        const payload = {
            ...assignment, availableFrom: availableFromLabel, due: dueLabel,
        };
        if (isNew) {
            const {_id, ...rest } = payload;
            dispatch(addAssignment(rest));
        } else {
            dispatch(updateAssignment(payload));
        }
    };


  return (
    <Container id="wd-assignments-editor">
      <div  className="border-bottom pb-2 mb-3">
        <Row className="mt-3">
            
            <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
            <FormControl 
            id="wd-name" 
            type="text" 
            value={assignment.title}
            onChange={(e) => updateField("title", e.target.value)}>
            </FormControl>
        </Row>
        <Row className="mt-3">
            <FormLabel htmlFor="wd-description"></FormLabel>
            <FormControl
            id="wd-description"  
            as="textarea" 
            rows={3}
            value={assignment.description}
            onChange={(e) => updateField("description", e.target.value)}>
            </FormControl>
        </Row>
        <Row className="mt-3 g-3">
            <Col><FormLabel htmlFor="wd-points"className="float-end" column sm={2}>Points</FormLabel></Col>
            <Col md={6}>
            <FormControl id="wd-points" type="number" 
            value={assignment.points}
            onChange={(e) => updateField("points", e.target.value)} />
            </Col>
        </Row>
        <Row className="mt-3 g-3">
            <Col><FormLabel htmlFor="wd-group" className="float-end" column sm={4}>Assignment Group</FormLabel></Col>
            <Col md={6}>
            <FormSelect id="wd-group" 
            value={assignment.group}
            onChange={(e) => updateField("group", e.target.value)}>
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
            </FormSelect>
            </Col>
        </Row>
        <Row className="mt-3 g-3">
            <Col><FormLabel htmlFor="wd-display-grade-as"className="float-end" column sm={4}>Display Grade as</FormLabel></Col>
            <Col md={6}>
            <FormSelect id="wd-display-grade-as" 
            value={assignment.displayAs}
            onChange={(e) => updateField("displayAs", e.target.value)} >
                <option>Percentage</option>
                <option>Points</option>
            </FormSelect>
            </Col>
        </Row>

            <Row className="mt-3 g-3">
            <Col>
                <FormLabel htmlFor="wd-submission-type" className="float-end" column sm={4}>Submission Type</FormLabel></Col>
                <Col md={6}>
                <Card>
                    <CardBody>
                        <FormSelect id="wd-submission-type"
                        value={assignment.submissionType}
                        onChange={(e) => updateField("submissionType", e.target.value)}>
                            <option value={"Online"}>Online</option>
                            <option value={"On Paper"}>On Paper</option>
                        </FormSelect>
                
                    <div className="mb-2"> 
                        <br />
                        <h5>Online Entry Options</h5></div>
                    <fieldset>
                        <FormLabel as="legend"></FormLabel>
                    <Col className="mb-2 form-check-input-lg" >
                        <FormCheck id="wd-text-entry" type="checkbox" label="wd-text-entry"  defaultChecked />
                        <FormCheck id="wd-website-url" type="checkbox" label="wd-website-url" />
                        <FormCheck id="wd-media-recordings" type="checkbox" label="wd-media-recordings" />
                        <FormCheck id="wd-student-annotation" type="checkbox" label="wd-student-annotation" />
                        <FormCheck id="wd-file-upload" type="checkbox" label="wd-file-upload" />
                    </Col>
                    
                    </fieldset>
                
            
                    </CardBody>
                </Card>
                </Col>
            </Row>
            <Row className="mt-3 g-3">
                <Col>
                <FormLabel className="float-end" column sm={2}>Assign</FormLabel>
                </Col>
                <Col md={6}>
                <Card>
                    <CardBody>
                        <FormLabel htmlFor="wd-assign-to" className="fw-semibold">Assign to</FormLabel>
                        <FormControl id="wd-assign-to" type="text" 
                        defaultValue={"Everyone"}></FormControl>
                        <br/>
                        <FormLabel htmlFor="wd-due-date" className="fw-semibold">Due</FormLabel>
                        <FormControl id="wd-due-date" type="datetime-local" 
                        value={assignment.dueDate} 
                        onChange={(e) => updateField("dueDate", e.target.value)}></FormControl>
                        <br />
                        <Row>
                            <Col>
                        <FormLabel htmlFor="wd-available-from" className="fw-semibold">Available from</FormLabel>
                        <FormControl type="datetime-local" id="wd-available-from"
                        value={assignment.availableDate}
                        onChange={(e) => updateField("availableDate", e.target.value)}></FormControl></Col>
                        <Col>
                        <FormLabel htmlFor="wd-available-until" className="fw-semibold">Until</FormLabel>
                        <FormControl id="wd-available-until" type="datetime-local"
                        value={assignment.dueDate}
                        onChange={(e) => updateField("availableUntilDate", e.target.value)} ></FormControl></Col>
                        </Row>


                    </CardBody>
                </Card>
                </Col>

            </Row>
            <br/>
      </div>
        {isFaculty && (
      <Link href={`/Courses/${cid}/Assignments`} className="text-decoration-none" onClick={handleSave}>
        <Button href={`/Courses/${cid}/Assignments`} variant="danger" size="lg" className="me-1 float-end" id="wd-save">Save</Button></Link>
        )}
       <Link href={`/Courses/${cid}/Assignments`} className="text-decoration-none">
        <Button href={`/Courses/${cid}/Assignments`}variant="secondary" size="lg" className="me-1 float-end" id="wd-cancel">Cancel</Button></Link>

    </Container>

);}
