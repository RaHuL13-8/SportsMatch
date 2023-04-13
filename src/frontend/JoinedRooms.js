import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar1 from "./NavBar1";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import { useAuthValue } from "../context.js";
import { onAuthStateChanged } from "firebase/auth";
import { FaCrown } from "react-icons/fa";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Navbar2 from "./NavBar2";
import Footer from "./Footer";
import { useMediaQuery } from "react-responsive";
const JoinedRooms = () => {
  const navigate = useNavigate();
  // const { currentUser } = useAuthValue();
  const [listOfRooms, setListOfRooms] = useState([]);
  const [update, setUpdate] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, loading] = useAuthState(auth);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  var idx = 0;
  const logo = {
    Cricket: "bat_ball.jpg",
    Football: "football.jpg",
    Hockey: "Hockey.jpg",
    Kabaddi: "kabaddi.png",
    VolleyBall: "volleyball1.jpg",
    TableTennis: "tableTennis.jpg",
    Tennis: "Tennis.jpg",
    Badminton: "badminton.jpg",
  };
  // console.log(currentUser);
  // const uid = currentUser.uid;
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

  var info = [];
  const getListOfRooms = async () => {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    // if (adminSnap.data().Members[0] === uid) {
    //   setIsAdmin(true);
    // }
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setListOfRooms(docSnap.data().Chatrooms);
      console.log(docSnap.data().Chatrooms);
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
    }
  };

  // const getRoomInfo = async ({ id }) => {
  //   const docRef = doc(db, "Rooms", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     info.push(docSnap.data());
  //     console.log("info:", info);
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };

  // const getRoomInfoHelper = () => {
  //   listOfRooms.map((s) => {
  //     const { id } = s;
  //     getRoomInfo(id);
  //   });
  // };
  const goToChatroom = async ({ id }) => {
    const user = doc(db, "Users", uid);

    // await updateDoc(user, {
    //   Chatrooms: arrayUnion({ s }),
    // });
    navigate("/chatroom2", { state: { id: id } });
  };
  const LeaveChatroom = async ({ s }) => {
    const docRef = doc(db, "Users", uid);
    // console.log(s.s);
    // console.log(uid);
    var mid = {};
    const docSnap = await getDoc(docRef);
    const Sport = s.s.Sport;
    mid = docSnap.data().TopSport;

    mid[Sport] = mid[Sport] - 1;

    await updateDoc(docRef, {
      Chatrooms: arrayRemove(s),
      total_matches: increment(-1),
      TopSport: mid,
    });

    const room = doc(db, "Rooms", s.s.id);
    console.log(uid);
    await updateDoc(room, {
      Members: arrayRemove(uid),
    });
    setUpdate(!update);
  };
  useEffect(() => {
    if (uid !== null) getListOfRooms();
  }, [update, user]);

  return (
    <section>
      {isBigScreen || !isMobile ? (
        <div className="row">
          <div className="col-2 col-nav">
            <Navbar2 />
          </div>
          <div className="col-10 container2">
            {/* <div className="container2"> */}
            <div className="row">
              <div className="col-1" style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "2.5vw" }}>#</h1>
              </div>
              <div
                className="col-2"
                style={{
                  textAlign: "center",
                }}
              >
                <h1 style={{ fontSize: "2.5vw" }}>Sport</h1>
              </div>
              <div className="col-1"></div>
              <div className="col-2" style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "2.5vw" }}>Max Players</h1>
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "2.5vw" }}>ID</h1>
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "2.5vw" }}>Join</h1>
              </div>
              <div
                className="col-2"
                style={{ textAlign: "center", fontSize: "2.5vw" }}
              >
                <h1 style={{ fontSize: "2.5vw" }}>Leave/Admin</h1>
              </div>
            </div>
            <br />
            <br />
            {console.log(listOfRooms)}
            <br />
            {listOfRooms.map((s) => {
              const { MaxPlayers, time, Sport, Members, id } = s.s;
              {
                console.log(s.s);
              }
              const s1 = "Cricket";
              console.log(typeof Sport);
              console.log("Logo:", logo[Sport]);
              idx += 1;
              return (
                <div className="card-matches">
                  <div className="row">
                    <div
                      className="col-1"
                      style={{ textAlign: "center", fontSize: "1.5vw" }}
                    >
                      {idx}.
                    </div>
                    <div
                      className="col-1 logo-sport"
                      style={{ textAlign: "center" }}
                    >
                      <img src={logo[Sport]}></img>
                    </div>
                    <div
                      className="col-2"
                      style={{ textAlign: "center", fontSize: "1.5vw" }}
                    >
                      <div className="row">{Sport}</div>
                      <div className="row">Time:{time}</div>
                    </div>
                    <div
                      className="col-2"
                      style={{ textAlign: "center", fontSize: "1.5vw" }}
                    >
                      {Members.length}/{MaxPlayers}
                    </div>
                    <div
                      className="col-2"
                      style={{ textAlign: "center", fontSize: "1vw" }}
                    >
                      {Members[0] === uid ? id : ""}
                    </div>
                    <div
                      className="col-2"
                      style={{ textAlign: "center", fontSize: "1.5vw" }}
                    >
                      <button
                        type="button"
                        className="btn-h btn btn-success"
                        style={{ textAlign: "center" }}
                        onClick={() => goToChatroom({ id })}
                      >
                        Join
                      </button>
                    </div>
                    <div className="col-2" style={{ textAlign: "center" }}>
                      {console.log("Admin:", Members[0], uid)}
                      {Members[0] === uid ? (
                        <FaCrown size={"2.5vw"} />
                      ) : (
                        <button
                          type="button"
                          className="btn-h btn btn-danger"
                          style={{ textAlign: "center" }}
                          onClick={() => LeaveChatroom({ s })}
                        >
                          Leave
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <section>
          <Navbar1></Navbar1>
          <div className="container-mobile">
            <div className="row">
              <div className="col-12" style={{ textAlign: "center" }}>
                Joined Matches
              </div>
            </div>
            <br />
            {console.log(listOfRooms)}
            <br />
            {listOfRooms.map((s) => {
              const { MaxPlayers, time, Sport, Members, id } = s.s;
              {
                console.log(s.s);
              }
              const s1 = "Cricket";
              console.log(typeof Sport);
              console.log("Logo:", logo[Sport]);
              idx += 1;
              return (
                <div className="card-matches">
                  <button
                    style={{ backgroundColor: "white", border: "none" }}
                    onClick={() => goToChatroom({ id })}
                  >
                    <div className="card-matches-body">
                      <div className="row">
                        {/* <div
                      className="col-1"
                      style={{ textAlign: "center", fontSize: "2.5vw" }}
                    >
                      {idx}.
                    </div> */}
                        <div
                          className="col-3 logo-sport"
                          style={{ textAlign: "center" }}
                        >
                          <img src={logo[Sport]}></img>
                        </div>
                        <div
                          className="col-1"
                          style={{ textAlign: "center", fontSize: "3.5vw" }}
                        >
                          <div className="row">{Sport}</div>

                          <div className="row">{time}</div>
                        </div>
                        <div className="col-2"></div>
                        <div
                          className="col-1"
                          style={{
                            textAlign: "center",
                            fontSize: "3.5vw",
                          }}
                        >
                          <div className="row">Players:</div>
                          <div className="row">
                            {Members.length}/{MaxPlayers}
                          </div>
                        </div>
                        {/* <div
                          className="col-3"
                          style={{ textAlign: "center", fontSize: "1.5vw" }}
                        >
                          <button
                            type="button"
                            className="btn-h btn btn-success"
                            style={{ textAlign: "center" }}
                            onClick={() => goToChatroom({ id })}
                          >
                            <p style={{ fontSize: "3.5vw" }}>Join</p>
                          </button>
                        </div> */}
                        <div className="col-1"></div>
                        <div className="col-4" style={{ textAlign: "center" }}>
                          {console.log("Admin:", Members[0], uid)}
                          {Members[0] === uid ? (
                            <FaCrown size={"8vw"} />
                          ) : (
                            <button
                              type="button"
                              className="btn-h btn btn-danger"
                              style={{ textAlign: "center", fontSize: "3.5vw" }}
                              onClick={() => LeaveChatroom({ s })}
                            >
                              <p style={{ fontSize: "3.5vw" }}>Leave</p>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div
                          className="col-12 footer-card"
                          style={{
                            backgroundColor: "pink",
                            height: "3.2vh",
                            width: "100vw",
                          }}
                        >
                          <p style={{ fontSize: "4vw", textAlign: "left" }}>
                            {" "}
                            1kms away
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* </div> */}
    </section>
  );
};

export default JoinedRooms;
