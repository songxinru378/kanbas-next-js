"use client"
import { useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { RootState } from "../store";
import { enrollCourse, unenrollCourse } from "../Enrollments/reducer";



export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const dispatch = useDispatch();
    const isFaculty = !!currentUser && (currentUser as any).role === "FACULTY";
    const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  const handleEnroll = (userId: string, courseId:string) => {
    dispatch(enrollCourse({user: userId, course: courseId}));
  };
  const handleUnenroll = (userId:string, courseId:string) => {
    dispatch(unenrollCourse({user: userId, course: courseId}));
  };
  const [showAllCourses, setShowAllCourses] = useState(false);
  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };
  
  return (
    <div id="wd-dashboard">
        <Row>
      <Col><h1 id="wd-dashboard-title">Dashboard</h1></Col>
      <Col>{currentUser && (
        <Button variant="primary" className="float-end"
        onClick={() => setShowAllCourses(!showAllCourses)}>
            {showAllCourses ? "Show My Courses": "Show All Courses"}
        </Button>
      )}</Col>
       </Row> <hr />
        {isFaculty && (
        <>
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={() => dispatch(addNewCourse(course))} > Add </button>
                  <button className="btn btn-warning float-end me-2"
                onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
          Update </button>
      </h5><br />
      <FormControl value={course.name} className="mb-2" 
      onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <FormControl as="textarea" value={course.description} rows={3}
      onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
            </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        
            <Row xs={1} md={5} className="g-4">
                {courses.
                filter((course) => {
                    if (!currentUser) return false;
                    if (showAllCourses) return true;
                    return enrollments.some(
                        (e:any) => e.user === (currentUser as any)._id && e.course === course._id
                    );
                })
                .map((course:any) => {
                    const enrolled = currentUser && enrollments.some(
                        (e:any) => e.user === (currentUser as any)._id && e.course === course._id
                    );
                return (
                <Col key={course._id} className="wd-dashboard-course col" style={{width: "300px"}}>
                <Card>
          <Link href={`/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/reactjs.jpg" alt="" width="100%" height={160} />
            <CardBody>

              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> {course.name} </CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                {course.description}</CardText>
                
              <Button variant="primary"> Go </Button>
                {isFaculty && (
                          <>
              <button onClick={(event) => {
                      event.preventDefault();
                      dispatch(deleteCourse(course._id));
                    }} className="btn btn-danger float-end"
                    id="wd-delete-course-click">
                    Delete
            </button>
            <button id="wd-edit-course-click"
                    onClick={(event) => {
                    event.preventDefault();
                    setCourse(course);
                    }}
                    className="btn btn-warning me-2 float-end" >
                    Edit
                    </button>
                        </>
                    )}

                    {currentUser && (
                        enrolled ? (
                            <button className="btn btn-danger me-2 mt-2" 
                            onClick={(event) => {
                                event.preventDefault();
                                dispatch(
                                    unenrollCourse({
                                        user: (currentUser as any)._id,
                                        course: course._id,
                                    })
                                );
                            }}
                            >Unenroll</button>
                        ) : (
                            <button className="btn btn-success me-2 mt-2"
                            onClick={(event) => {
                                event.preventDefault();
                                dispatch(
                                    enrollCourse({
                                        user:(currentUser as any)._id,
                                        course:course._id,
                                    })
                                );
                            }}
                            > Enroll </button>
                        )
                    )}

            </CardBody>
          </Link>
          </Card>
          </Col>
                
                );
})}
        
            </Row>
        </div>
      </div>
);}
