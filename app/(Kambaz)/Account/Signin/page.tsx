"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";
export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
 const dispatch = useDispatch();
 const signin = () => {
   const user = db.users.find(
     (u: any) =>
       u.username === credentials.username &&
       u.password === credentials.password
   );
   if (!user) return;
   dispatch(setCurrentUser(user));
   redirect("/Dashboard");
 };

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
             className="mb-2" defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}/>
      <FormControl id="wd-password"
             placeholder="password" type="password"
             className="mb-2" defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/>
      <Button onClick={signin} id="wd-signin-btn"
            
            className="btn btn-primary w-100 mb-2">
            Sign in </Button>
      <Link id="wd-signup-link" href="/Account/Signup">Sign up</Link>
    </div>
   </div>
);}
