import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
const JoinARoom = () => {
  const navigate = useNavigate();
  const [sport, setSport] = useState("");
  const [time, setTime] = useState("");
  const [maxPlayers, setMaxplayers] = useState("");

  const user = auth.currentUser;
  var uid;
  if (user !== null) {
    uid = user.uid;
  }
  const Members = [];
  Members.push(uid);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const docLoc = doc(db, "Users", uid);
    const docLocSnap = await getDoc(docLoc);
    console.log(docLocSnap.data());

    const docRef = await addDoc(collection(db, "Rooms"), {
      Sport: sport,
      time: time,
      MaxPlayers: maxPlayers,
      Members: Members,
      Location: [docLocSnap.data().latitude, docLocSnap.data().longitude],
    });
    console.log(docRef);
    navigate("/chatroom", { state: { id: docRef.id } });
  };

  return (
    <section>
      <NavBar1 />
      <div className="container1">
        <div className="card1" style={{ width: "600px" }}>
          <h1 className="card1-title">Private Room</h1>
          <div className="card-body">
            <h2 style={{ paddingTop: "50px" }}>Create A Room:</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label
                  style={{ fontSize: "30px" }}
                  htmlFor="email"
                  className="form-label"
                >
                  Sport:
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  placeholder="Enter the sport you want to play"
                  name="name"
                  onChange={(e) => setSport(e.target.value)}
                ></input>
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "30px" }}
                  htmlFor="pwd"
                  className="form-label"
                >
                  Time:
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  placeholder="Enter the time you want to play"
                  name="time"
                  onChange={(e) => setTime(e.target.value)}
                />
                <div className="mb-3 mt-3">
                  <label
                    style={{ fontSize: "30px" }}
                    htmlFor="email"
                    className="form-label"
                  >
                    Max Players:
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter the max Number of players required"
                    name="name"
                    onChange={(e) => setMaxplayers(e.target.value)}
                  ></input>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinARoom;
