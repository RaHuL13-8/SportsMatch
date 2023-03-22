import { React, useEffect, useState } from "react";
import Navbar1 from "./NavBar1";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
export default function Profile() {
  const [id, setId] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setId(uid);
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);
  return (
    <section>
      <Navbar1 />
      <div className="container-p">
        <div class="card">
          <h1 className="card1-title">Profile</h1>
          <img
            class="card-img-top"
            src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
            alt="Card image"
            width="20"
            height="300"
          ></img>
          <div class="card-header">Rahul Pandove</div>
          <div class="card-body">
            <h2>UserName</h2>
            <h4>rah</h4>
            <br />
            <h2>Email</h2>
            <h4>rahpandov@gmail.com</h4>
          </div>
          <div class="card-footer">SportsMatch</div>
        </div>
      </div>
    </section>
  );
}
