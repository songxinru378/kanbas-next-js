"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { courses } from "../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function CourseNavigation({ cid }: { cid: string }) {
    
    const course = courses.find((course) => course._id === cid);
    const pathname = usePathname();
    
    const links = [{label:"Home", path: `/Courses/${cid}/Home`},
        {label:"Modules", path: `/Courses/${cid}/Modules`}
        , {label:"Piazza", path:`/Courses/${cid}/Piazza`},
         {label:"Zoom", path:`/Courses/${cid}/Zoom`}, 
         {label:"Assignments", path:`/Courses/${cid}/Assignments`},
         {label:"Quizzes", path: `/Courses/${cid}/Quizzes`}, 
         {label:"Grades", path: `/Courses/${cid}/Grades`}, 
         {label:"People", path: `/Courses/${cid}/People/Table`}];
  return (
    <ListGroup className="wd fs-5 rounded-0" id="wd-courses-navigation">
        {links.map((link)=>(
            <ListGroupItem key={link.path} as={Link} href={link.path}
            className={`text-danger border-0
                ${pathname.includes(link.label) ? "text-black": "text-danger"}`}>
                    {link.label}
                </ListGroupItem>
        ))}

    </ListGroup>
     );}


    
   
