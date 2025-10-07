import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     {/*<h3>Sign in</h3>
     <input placeholder="username" className="wd-username" defaultValue={"Sirius Black"}/> <br />
     <input placeholder="password" type="password" className="wd-password" defaultValue={"123456"} /> <br />
     <Link href="/Dashboard" id="wd-signin-btn"> Sign in </Link> <br />
     <Link href="Signup" id="wd-signup-link"> Sign up </Link>*/}

     <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl id="wd-username"
             placeholder="username"
             className="mb-2"/>
      <FormControl id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <Link id="wd-signin-btn"
            href="/Dashboard"
            className="btn btn-primary w-100 mb-2">
            Sign in </Link>
      <Link id="wd-signup-link" href="/Account/Signup">Sign up</Link>
    </div>
   </div>
);}
