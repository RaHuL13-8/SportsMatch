import { React, useEffect, useState } from "react";
import Navbar1 from "./NavBar1";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../backend/firebase";
import { useAuthValue } from "../context.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
export default function Profile() {
  // const user = auth.currentUser;
  var displayName;
  var email;
  var FavSport;
  // if (user !== null) {
  //   displayName = user.displayName;
  //   email = user.email;
  //   FavSport = user.FavSport;
  //   const uid = user.uid;
  //   // console.log(user);
  // }
  // const { currentUser } = useAuthValue();
  // console.log(currentUser.uid);

  const [user, loading] = useAuthState(auth);
  return (
    <section>
      <Navbar1 />
      {loading ? (
        "Loading"
      ) : (
        <div className="container-p">
          <div className="card">
            <h1 className="card1-title">Profile</h1>
            <img
              className="card-img-top"
              src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
              alt="Card image"
              width="20"
              height="300"
            ></img>
            <div className="card-header">{displayName}</div>
            <div className="card-body">
              <h2>UserName</h2>
              <h4>{user.displayName}</h4>
              <br />
              <h2>Email</h2>
              <h4>{user.email}</h4>
              <br />
              <h2>Fav Sport</h2>
              <h4>{user.FavSport}</h4>
            </div>
            <div className="card-footer">SportsMatch</div>
          </div>
        </div>
      )}
    </section>
  );
}
