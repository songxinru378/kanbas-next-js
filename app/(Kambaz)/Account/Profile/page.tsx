"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import Link from "next/link";
import { Button, FormControl, FormSelect } from "react-bootstrap";
export default function Profile() {
    const [profile, setProfile] = useState<any>({});
 const dispatch = useDispatch();
 const { currentUser } = useSelector((state: RootState) => state.accountReducer);
 const fetchProfile = () => {
   if (!currentUser) return redirect("/Account/Signin");
   setProfile(currentUser);
 };
 const signout = () => {
   dispatch(setCurrentUser(null));
   redirect("/Account/Signin");
 };
 useEffect(() => {
   fetchProfile();
 }, []);

  return (
    <div id="wd-profile-screen">
      {/*<h3>Profile</h3>
      <input defaultValue="alice" placeholder="username" className="wd-username"/><br/>
      <input defaultValue="123"   placeholder="password" type="password"
             className="wd-password" /><br/>
      <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" /><br/>
      <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" /><br/>
      <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
      <input defaultValue="alice@wonderland" type="email" id="wd-email" /><br/>
      <select defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>       <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
      </select><br/>
      <Link href="Signin" > Sign out </Link>*/}

      <h3>Profile</h3>
      {profile && (
        <div>
      <FormControl id="wd-username" placeholder="username"  className="mb-2"
      defaultValue={profile.username} onChange={(e) => setProfile({...profile, username: e.target.value})}/>
      <FormControl id="wd-password" placeholder="password" type="password" className="mb-2"
      defaultValue={profile.password}
           onChange={(e) => setProfile({ ...profile, password: e.target.value }) }/>
      <FormControl id="wd-firstname" placeholder="First Name" className="mb-2"
      defaultValue={profile.firstName}
           onChange={(e) => setProfile({ ...profile, firstName: e.target.value }) }/>
      <FormControl id="wd-lastname" placeholder="Last Name" className="mb-2"
      defaultValue={profile.lastName}
           onChange={(e) => setProfile({ ...profile, lastName: e.target.value }) }/>
      <FormControl type="date" id="wd-dob" className="mb-2"
      defaultValue={profile.dob}
           onChange={(e) => setProfile({ ...profile, dob: e.target.value })}/>
      <FormControl type="email" id="wd-email" className="mb-2"
      defaultValue={profile.email}
           onChange={(e) => setProfile({ ...profile, email: e.target.value })}/>
      <FormSelect id="wd-role" className="form-control mb-2"
      onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> 
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
           Sign out
         </Button>

        </div>

      )}


    </div>
);}
