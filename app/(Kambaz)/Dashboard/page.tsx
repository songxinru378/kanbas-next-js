import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" alt="" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/2nd.jpg" alt="" width={200} height={150} />
            <div>
              <h5> CS5678 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Website Design and Development
              </p>
              <button> Go </button>
            </div>
            </Link> 
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/6789" className="wd-dashboard-course-link">
            <Image src="/images/3rd.jpg" alt="" width={200} height={150} />
            <div>
              <h5> CS6789 Database Management </h5>
              <p className="wd-dashboard-course-title">
                Datebase Management
              </p>
              <button> Go </button>
            </div>
            </Link> 
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/7890" className="wd-dashboard-course-link">
            <Image src="/images/4th.jpg" alt="" width={200} height={150} />
            <div>
              <h5> CS7890 Java </h5>
              <p className="wd-dashboard-course-title">
                Java
              </p>
              <button> Go </button>
            </div>
            </Link> 
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/2345" className="wd-dashboard-course-link">
            <Image src="/images/5th.jpg" alt="" width={200} height={150} />
            <div>
              <h5> CS2345 Python </h5>
              <p className="wd-dashboard-course-title">
                Python
              </p>
              <button> Go </button>
            </div>
            </Link> 
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/3456" className="wd-dashboard-course-link">
            <Image src="/images/6th.jpg" alt="" width={200} height={150} />
            <div>
              <h5> CS3456 Machine Learning </h5>
              <p className="wd-dashboard-course-title">
                Machine Learning
              </p>
              <button> Go </button>
            </div>
            </Link> 
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/Courses/4567" className="wd-dashboard-course-link">
            <Image src="/images/7th.jpg" alt="" width={200} height={150} />
            <div>
              <h5> CS4567 Human-Computer Intercation </h5>
              <p className="wd-dashboard-course-title">
                Human-Computer Intercation
              </p>
              <button> Go </button>
            </div>
            </Link> 
        </div>
      </div>
    </div>
);}
