import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        
            <Row xs={1} md={5} className="g-4">
                <Col className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
          <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/reactjs.jpg" alt="" width="100%" height={160} />
            <CardBody>

              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS1234 React JS </CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Full Stack software developer</CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
          </Col>
        <Col className="wd-dashboard-course" style={{width: "300px"}}>
        <Card>
            <Link href="/Courses/5678" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/2nd.jpg" alt="" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS5678 Web Development </CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Website Design and Development</CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
            </Link> 
            </Card>
          </Col>
        <Col className="wd-dashboard-course" style={{width: "300px"}}>
        <Card> 
            <Link href="/Courses/6789" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/3rd.jpg" alt="" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS6789 Database </CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Database Management</CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
            </Link> 
        </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{width: "300px"}}> 
        <Card>
            <Link href="/Courses/7890" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/4th.jpg" alt="" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS7890 Java </CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Intro to Java</CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
            </Link> 
        </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{width: "300px"}}> 
        <Card>
            <Link href="/Courses/2345" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/5th.jpg" alt="" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS2345 Python </CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Intro to Python </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
            </Link> 
        </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{width: "300px"}}> 
        <Card>
            <Link href="/Courses/3456" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/6th.jpg" alt="" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS3456 Machine Learning </CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Intro to Machine Learning</CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
            </Link> 
        </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{width: "300px"}}> 
        <Card>
            <Link href="/Courses/4567" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/7th.jpg" alt="" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4567 HCI </CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Human-Computer Intercation </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
            </Link> 
            </Card>
            </Col>
            </Row>
        </div>
      </div>
);}
