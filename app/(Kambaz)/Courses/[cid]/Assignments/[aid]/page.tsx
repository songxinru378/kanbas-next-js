import { Col, FormControl, FormLabel, Row, FormSelect, CardBody, FormCheck, Card, Button, Container } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <Container id="wd-assignments-editor">
      <div  className="border-bottom pb-2 mb-3">
        <Row className="mt-3">
            
            <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
            <FormControl id="wd-name" type="text" defaultValue="A1 - ENV + HTML"></FormControl>
        </Row>
        <Row className="mt-3">
            <FormLabel htmlFor="wd-description"></FormLabel>
            <FormControl  type="textarea" defaultValue={"The assignment is available online Submit a link to the landing page of your Web application running on Netlify."}></FormControl>
        </Row>
        <Row className="mt-3 g-3">
            <Col><FormLabel htmlFor="wd-points"className="float-end" column sm={2}>Points</FormLabel></Col>
            <Col md={6}>
            <FormControl id="wd-points" type="number" defaultValue={100} />
            </Col>
        </Row>
        <Row className="mt-3 g-3">
            <Col><FormLabel htmlFor="wd-group" className="float-end" column sm={4}>Assignment Group</FormLabel></Col>
            <Col md={6}>
            <FormSelect id="wd-group" defaultValue={"ASSIGNMENTS"}>
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
            </FormSelect>
            </Col>
        </Row>
        <Row className="mt-3 g-3">
            <Col><FormLabel htmlFor="wd-display-grade-as"className="float-end" column sm={4}>Display Grade as</FormLabel></Col>
            <Col md={6}>
            <FormSelect id="wd-display-grade-as" defaultValue={"Percentage"}>
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
                        <FormSelect id="wd-submission-type">
                            <option defaultValue={"Online"}>Online</option>
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
                        <FormControl id="wd-assign-to" type="text" defaultValue={"Everyone"}></FormControl>
                        <br/>
                        <FormLabel htmlFor="wd-due-date" className="fw-semibold">Due</FormLabel>
                        <FormControl id="wd-due-date" type="date" defaultValue={"2024-05-13"}></FormControl>
                        <br />
                        <Row>
                            <Col>
                        <FormLabel htmlFor="wd-available-from" className="fw-semibold">Available from</FormLabel>
                        <FormControl type="date" defaultValue={"2024-05-06"} id="wd-available-from"></FormControl></Col>
                        <Col>
                        <FormLabel htmlFor="wd-available-until" className="fw-semibold">Until</FormLabel>
                        <FormControl id="wd-available-until" type="date" defaultValue={"2024-05-20"}></FormControl></Col>
                        </Row>


                    </CardBody>
                </Card>
                </Col>

            </Row>
            <br/>
      </div>
        <Button variant="danger" size="lg" className="me-1 float-end" id="wd-save">Save</Button>
        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-cancel">Cancel</Button>

    </Container>

);}
