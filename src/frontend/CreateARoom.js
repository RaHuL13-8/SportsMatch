import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Navbar2 from "./NavBar2";
const JoinARoom = () => {
  const navigate = useNavigate();
  const [sport, setSport] = useState("");
  const [time, setTime] = useState("");
  const [maxPlayers, setMaxplayers] = useState("");
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  var uid;
  if (loading) {
    console.log("Loading");
  } else {
    // setId(currentUser.uid);
    console.log(user);
    if (user == null) {
      navigate("/");
    } else uid = user.uid;
    // console.log(currentUser);
  }
  const Members = [];
  Members.push(uid);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const docLoc = doc(db, "Users", uid);
    const docLocSnap = await getDoc(docLoc);
    // console.log(docLocSnap.data());

    const docRef = await addDoc(collection(db, "Rooms"), {
      Sport: sport,
      time: time,
      MaxPlayers: maxPlayers,
      Members: Members,
      Location: [docLocSnap.data().latitude, docLocSnap.data().longitude],
    });

    // console.log(docRef.data());

    const user = doc(db, "Users", uid);

    await updateDoc(user, {
      Chatrooms: arrayUnion({
        s: {
          id: docRef.id,
          Sport: sport,
          time: time,
          MaxPlayers: maxPlayers,
          Members: Members,
          Location: [docLocSnap.data().latitude, docLocSnap.data().longitude],
        },
      }),
    });

    // console.log(docRef);
    navigate("/chatroom", { state: { id: docRef.id } });
  };

  return (
    <section>
      <div className="row">
        <div className="col-2 col-nav">
          <Navbar2 />
        </div>
        <div className="col-10 container">
          <div className="card1" style={{ width: "600px" }}>
            <h1 className="card1-title" style={{ color: "gray" }}>
              Private Room
            </h1>
            <div className="card-body">
              <h2 style={{ paddingTop: "50px", color: "gray" }}>
                Create A Room
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                  <label
                    style={{ fontSize: "25px", color: "gray" }}
                    htmlFor="email"
                    className="form-label"
                  >
                    Sport
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="name"
                    style={{
                      borderTop: "0px solid",
                      borderLeft: "0px solid",
                      borderRight: "0px solid",
                    }}
                    placeholder="Enter the sport you want to play"
                    name="name"
                    onChange={(e) => setSport(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    style={{ fontSize: "25px", color: "gray" }}
                    htmlFor="pwd"
                    className="form-label"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    style={{
                      borderTop: "0px solid",
                      borderLeft: "0px solid",
                      borderRight: "0px solid",
                    }}
                    placeholder="Enter the time you want to play"
                    name="time"
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <div className="mb-3 mt-3">
                    <label
                      style={{ fontSize: "25px", color: "gray" }}
                      htmlFor="email"
                      className="form-label"
                    >
                      Max Players
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="name"
                      style={{
                        borderTop: "0px solid",
                        borderLeft: "0px solid",
                        borderRight: "0px solid",
                      }}
                      placeholder="Enter the max Number of players required"
                      name="name"
                      onChange={(e) => setMaxplayers(e.target.value)}
                    ></input>
                  </div>
                  <button type="submit" className="btn btn-dark btn-login">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinARoom;
