"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "../Courses/client";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { RootState } from "../store";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = !!currentUser && (currentUser as any).role === "FACULTY";
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [myCourses, setMyCourses] = useState<any[]>([]);

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };
  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
      if (c._id === course._id) {return course;}
      else {return c;}
    })));
  };

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!currentUser) return;
    fetchCourses();
  }, [currentUser]);

  const fetchAllAndMine = async () => {
    const all = await client.fetchAllCourses();
    dispatch(setCourses(all));

    const mine = await client.findMyCourses();
    setMyCourses(mine);
  };

  const refreshView = async (viewAll: boolean) => {
    if (viewAll) {
      await fetchAllAndMine();
    } else {
      await fetchCourses();
    }
  };

  const handleEnroll = async (courseId: string) => {
    await client.enrollInCourse(courseId);
    await refreshView(showAllCourses);
  };
  const handleUnenroll = async (courseId:string) => {
    await client.unenrollFromCourse(courseId);
    await refreshView(showAllCourses);
  };

  const toggleShowAllCourses = async () => {
    const next = !showAllCourses;
    setShowAllCourses(next);
    await refreshView(next);
  };
  
  return (
    <div id="wd-dashboard">
        <Row>
      <Col><h1 id="wd-dashboard-title">Dashboard</h1></Col>
      <Col>{currentUser && (
        <Button variant="primary" className="float-end"
        onClick={toggleShowAllCourses}>
            {showAllCourses ? "Show My Courses": "Show All Courses"}
        </Button>
      )}</Col>
       </Row> <hr />
       {isFaculty && (
        <>
      <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={onAddNewCourse} > Add </button>
                  <button className="btn btn-warning float-end me-2"
                onClick={onUpdateCourse} id="wd-update-course-click">
          Update </button>
      </h5>
      
      <br />
      <FormControl value={course.name} className="mb-2" 
      onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <FormControl as="textarea" value={course.description} rows={3}
      onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
      </>)}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        
            <Row xs={1} md={5} className="g-4">
                {courses
                .map((course:any) => {
                    const enrolled = !!currentUser &&
                      (showAllCourses 
                        ? myCourses.some((c: any) => c._id === course._id) : true
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
                      onDeleteCourse(course._id);
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
              )} <br/>

                    {currentUser && showAllCourses &&(
                        enrolled ? (
                            <button className="btn btn-danger me-2 mt-2 " 
                            onClick={(event) => {
                                event.preventDefault();
                                handleUnenroll(course._id);
                            }}
                            >Unenroll</button>
                        ) : (
                            <button className="btn btn-success me-2 mt-2 "
                            onClick={(event) => {
                                event.preventDefault();
                                handleEnroll(course._id);
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


