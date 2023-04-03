import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import { useAuthValue } from "../context.js";
import { onAuthStateChanged } from "firebase/auth";
import { getDistance, getPreciseDistance } from "geolib";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const JoinARoom = () => {
  const navigate = useNavigate();
  const [snap, setSnap] = useState([]);
  const [id, setId] = useState("");
  // const [uid, setUid] = useState("");

  const { currentUser } = useAuthValue();
  // console.log(currentUser.uid);
  const uid = currentUser.uid;

  const getMatches = async () => {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    const userLongitude = docSnap.data().longitude;
    const userLatitude = docSnap.data().latitude;

    const querySnapshot = await getDocs(collection(db, "Rooms"));
    var liste = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data().Location);
      const MatchLocation = doc.data().Location;
      console.log(doc.data());
      // console.log(MatchLocation);

      doc.data()["id"] = doc.id;
      var dis = getDistance(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: MatchLocation[0], longitude: MatchLocation[1] }
      );
      console.log("Distance: ", dis);
      // console.log(doc.id);
      console.log(doc.data().Members.includes(uid));
      var alreadyJoined = doc.data().Members.includes(uid);
      var MatchSize = doc.data().Members.length;
      if (dis <= 3000 && !alreadyJoined && MatchSize != doc.data().MaxPlayers) {
        liste.push({ ...doc.data(), id: doc.id, dist: dis });
        setSnap(liste);
        console.log("Liste: ", liste);
      }
    });
    return querySnapshot;
  };

  const goToChatroom = async ({ s }) => {
    // console.log(id);

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     const uid1 = user.uid;
    //     setUid(uid1);
    //     console.log(uid);
    //   }
    // });
    // console.log(uid);
    const user = doc(db, "Users", uid);
    const room = doc(db, "Rooms", s.id);

    await updateDoc(room, {
      Members: arrayUnion(uid),
    });
    await updateDoc(user, {
      Chatrooms: arrayUnion({ s }),
    });

    navigate("/chatroom", { state: { id: s.id } });
  };

  useEffect(() => {
    getMatches();
  }, []);
  // console.log(snap);
  return (
    <section>
      <NavBar1 />
      <div className="container1">
        <div className="row">
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Sport</h1>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Time</h1>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Players</h1>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Distance</h1>
            <h3>(in metre)</h3>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Id</h1>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Join</h1>
          </div>
        </div>
        <br />
        <br />
        {snap.map((s) => {
          const { Sport, time, Members, MaxPlayers, id, dist } = s;
          console.log(time);
          return (
            <div className="row">
              <div className="col-2" style={{ textAlign: "center" }}>
                {Sport}
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                {time}
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                {Members.length}/{MaxPlayers}
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                {dist}
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                {id}
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                <button
                  type="button"
                  className="btn-h btn btn-success"
                  style={{ textAlign: "center" }}
                  onClick={() => goToChatroom({ s })}
                >
                  Join
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default JoinARoom;
