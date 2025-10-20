"use client";
import { Col, FormControl, FormLabel, Row, FormSelect, CardBody, FormCheck, Card, Button, Container } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import Link from "next/link";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignments = db.assignments;
  return (
    <Container id="wd-assignments-editor">
              
      <div  className="border-bottom pb-2 mb-3">
        <Row className="mt-3">
            
            <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
            <FormControl 
            id="wd-name" 
            type="text" 
            defaultValue={assignments.find((assignment: any)=>assignment.course == cid && assignment._id == aid)?.title??""}>
            </FormControl>
        </Row>
        <Row className="mt-3">
            <FormLabel htmlFor="wd-description"></FormLabel>
            <FormControl
            id="wd-description"  
            type="textarea" 
            defaultValue={assignments.find((assignment:any) => assignment.course == cid && assignment._id == aid)?.description ??""}>
            </FormControl>
        </Row>
        <Row className="mt-3 g-3">
            <Col><FormLabel htmlFor="wd-points"className="float-end" column sm={2}>Points</FormLabel></Col>
            <Col md={6}>
            <FormControl id="wd-points" type="number" 
            defaultValue={assignments.find((assignment: any) => assignment.course == cid && assignment._id == aid)?.points ??""} />
            </Col>
        </Row>
        <Row className="mt-3 g-3">
            <Col><FormLabel htmlFor="wd-group" className="float-end" column sm={4}>Assignment Group</FormLabel></Col>
            <Col md={6}>
            <FormSelect id="wd-group" 
            defaultValue={assignments.find((assignment: any) => assignment.course == cid && assignment._id == aid)?.group ??""}>
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
            </FormSelect>
            </Col>
        </Row>
        <Row className="mt-3 g-3">
            <Col><FormLabel htmlFor="wd-display-grade-as"className="float-end" column sm={4}>Display Grade as</FormLabel></Col>
            <Col md={6}>
            <FormSelect id="wd-display-grade-as" 
            defaultValue={assignments.find((assignment:any) => assignment.course == cid && assignment._id == aid)?.displayAs ?? ""}>
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
                        defaultValue={assignments.find((assignment: any) => assignment.course == cid && assignment._id == aid)?.submissionType?? ""}>
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
                        defaultValue={assignments.find((assignment: any) => assignment.course == cid && assignment._id == aid)?.dueDate ?? ""}></FormControl>
                        <br />
                        <Row>
                            <Col>
                        <FormLabel htmlFor="wd-available-from" className="fw-semibold">Available from</FormLabel>
                        <FormControl type="datetime-local" 
                        defaultValue={assignments.find((assignment: any) => assignment.course == cid && assignment._id == aid)?.availableDate ?? ""} 
                        id="wd-available-from"></FormControl></Col>
                        <Col>
                        <FormLabel htmlFor="wd-available-until" className="fw-semibold">Until</FormLabel>
                        <FormControl id="wd-available-until" type="datetime-local" 
                        defaultValue={assignments.find((assignment: any) => assignment.course == cid && assignment._id == aid)?.dueDate ?? ""}></FormControl></Col>
                        </Row>


                    </CardBody>
                </Card>
                </Col>

            </Row>
            <br/>
      </div>
      <Link href={`/Courses/${cid}/Assignments`} className="text-decoration-none">
        <Button href={`/Courses/${cid}/Assignments`} variant="danger" size="lg" className="me-1 float-end" id="wd-save">Save</Button></Link>
       <Link href={`/Courses/${cid}/Assignments`} className="text-decoration-none">
        <Button href={`/Courses/${cid}/Assignments`}variant="secondary" size="lg" className="me-1 float-end" id="wd-cancel">Cancel</Button></Link>

    </Container>

);}
