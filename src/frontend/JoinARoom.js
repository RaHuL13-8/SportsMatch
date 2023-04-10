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
  increment,
} from "firebase/firestore";
import Navbar2 from "./NavBar2";
import { updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
const JoinARoom = () => {
  const navigate = useNavigate();
  const [snap, setSnap] = useState([]);
  // const [uid, setId] = useState(null);
  const [state, setState] = useState("Any");
  const [distance, setDistance] = useState(3000);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  // const { currentUser } = useAuthValue();
  var uid;
  var idx = 0;
  if (loading) {
    console.log("Loading");
  } else {
    // setId(currentUser.uid);
    console.log(user);
    if (user === null) {
      navigate("/");
    } else uid = user.uid;
    // console.log(currentUser);
  }
  const logo = {
    Cricket: "bat_ball.jpg",
    Football: "football.jpg",
    Hockey: "Hockey.jpg",
    Kabaddi: "kabaddi.png",
    VolleyBall: "VolleyBall1.jpg",
    Basketball: "Basketball1.jpg",
    TableTennis: "tableTennis.jpg",
    Tennis: "Tennis.jpg",
    Badminton: "badminton.jpg",
  };
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
      console.log("Distance Filter: ", parseInt(distance));
      doc.data()["id"] = doc.id;
      var dis = getPreciseDistance(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: MatchLocation[0], longitude: MatchLocation[1] }
      );
      console.log("Distance: ", dis);
      // console.log(doc.id);
      console.log(doc.data().Members.includes(uid));
      var alreadyJoined = doc.data().Members.includes(uid);
      var MatchSize = doc.data().Members.length;
      console.log("State: ", state, "Sport: ", doc.data().Sport);
      if (
        dis <= parseInt(distance) &&
        !alreadyJoined &&
        MatchSize != doc.data().MaxPlayers &&
        (state === "Any" || state === doc.data().Sport)
      ) {
        liste.push({ ...doc.data(), id: doc.id, dist: dis });
        setSnap(liste);
        console.log("Liste: ", liste); // Put a flag to know the list is empty or not
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

    // console.log(docSnap.data().TopSport);

    const user = doc(db, "Users", uid);
    const room = doc(db, "Rooms", s.id);
    var mid = {};
    const docSnap = await getDoc(user);
    const Sport = s.Sport;
    mid = docSnap.data().TopSport;

    mid[Sport] = mid[Sport] + 1;
    // console.log("Sport", Sport);
    await updateDoc(room, {
      Members: arrayUnion(uid),
    });
    await updateDoc(user, {
      Chatrooms: arrayUnion({ s }),
      total_matches: increment(1),
      TopSport: mid,
    });

    navigate("/chatroom2", { state: { id: s.id } });
  };
  const handleChange = (e) => {
    setState(e.target.value);
  };
  const changeDist = (e) => {
    setDistance(e.target.value);
    // console.log(distance);
  };
  useEffect(() => {
    if (uid !== null) getMatches();
  }, [state, distance, user]);
  // console.log(snap);
  return (
    <section>
      {user == null ? (
        "Login Pls"
      ) : (
        <div className="row">
          <div className="col-2 col-nav">
            <Navbar2 />
          </div>
          <div className="col-10 container2">
            <div className="row">
              <div className="col-1" style={{ textAlign: "center" }}>
                <h1>#</h1>
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                <h1>Sport</h1>
              </div>
              <div className="col-1"></div>
              <div className="col-2" style={{ textAlign: "center" }}>
                <h1>Players</h1>
              </div>
              <div className="col-1"></div>
              <div className="col-2" style={{ textAlign: "center" }}>
                <h1>Distance</h1>
                <h3>(in metre)</h3>
              </div>
              {/* <div className="col-2"></div>
              <div className="col-2" style={{ textAlign: "center" }}>
                <h1>Join</h1>
              </div> */}
            </div>
            <div className="row">
              {console.log(state)}
              <div className="col-4" style={{ textAlign: "center" }}>
                <form>
                  <label>
                    <select
                      className="select"
                      value={state.value}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="Any">Choose Sport</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Football">Football</option>
                      <option value="Hockey">Hockey</option>
                      <option value="VolleyBall">VolleyBall</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Tennis">Tennis</option>
                      <option value="Kabaddi">Kabaddi</option>
                      <option value="TableTennis">TableTennis</option>
                    </select>
                  </label>
                </form>
              </div>
              <div className="col-1" style={{ textAlign: "center" }}></div>
              <div className="col-1" style={{ textAlign: "center" }}></div>
              <div className="col-1"></div>
              <div className="col-2" style={{ textAlign: "center" }}>
                <form>
                  <input
                    className="select"
                    type="number"
                    placeholder="3000"
                    onChange={(e) => changeDist(e)}
                  ></input>
                </form>
              </div>
              <div className="col-2" style={{ textAlign: "center" }}></div>
              <div className="col-2" style={{ textAlign: "center" }}></div>
            </div>
            <br />
            <br />
            {snap.map((s) => {
              const { Sport, time, Members, MaxPlayers, id, dist } = s;
              console.log(time);
              idx = idx + 1;
              return (
                <div className="card-matches">
                  <div className="row">
                    <div className="col-1" style={{ textAlign: "center" }}>
                      {idx}.
                    </div>
                    <div className="col-1" style={{ textAlign: "center" }}>
                      <img src={logo[Sport]} width="80" height="80"></img>
                    </div>
                    <div className="col-2" style={{ textAlign: "center" }}>
                      <div className="row">{Sport}</div>
                      <div className="row">Time:{time}</div>
                    </div>
                    <div className="col-2" style={{ textAlign: "center" }}>
                      {Members.length}/{MaxPlayers}
                    </div>
                    <div className="col-1"></div>
                    <div className="col-2" style={{ textAlign: "center" }}>
                      {dist}
                    </div>
                    <div className="col-1"></div>
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
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default JoinARoom;
