import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      {/*<h3>Sign up</h3>
      <input placeholder="username" className="wd-username" defaultValue={"Sirius Black"}/><br/>
      <input placeholder="password" type="password" className="wd-password" defaultValue={"123456"}/><br/>
      <input placeholder="verify password"
             type="password" className="wd-password-verify" defaultValue={"123456"}/><br/>
      <Link  href="Profile" > Sign up </Link><br />
      <Link  href="Signin" > Sign in </Link>*/}

      <h1>Sign Up</h1>
      <FormControl id="wd-username"
             placeholder="username"
             className="mb-2"/>
      <FormControl id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <FormControl id="wd-password-verify" 
            placeholder="verify password password" type="password"
            className="mb-2"></FormControl>
      <Link id="wd-signup-btn"
            href="/Account/Profile"
            className="btn btn-primary w-100 mb-2">
            Sign up </Link>
      <Link id="wd-signup-link" href="/Account/Signin">Sign in</Link>


    </div>
);}
