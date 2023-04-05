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
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
const JoinedRooms = () => {
  const navigate = useNavigate();
  // const { currentUser } = useAuthValue();
  const [listOfRooms, setListOfRooms] = useState([]);
  const [update, setUpdate] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, loading] = useAuthState(auth);
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
    navigate("/chatroom", { state: { id: id } });
  };
  const LeaveChatroom = async ({ s }) => {
    const docRef = doc(db, "Users", uid);
    // console.log(s.s);
    // console.log(uid);
    await updateDoc(docRef, {
      Chatrooms: arrayRemove(s),
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
      <Navbar1 />
      <div className="container1">
        <div className="row">
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Sport</h1>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Time</h1>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Max Players</h1>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>ID</h1>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Join</h1>
          </div>
          <div className="col-2" style={{ textAlign: "center" }}>
            <h1>Leave</h1>
          </div>
        </div>
        <br />
        <br />
        {console.log(listOfRooms)}
        {listOfRooms.map((s) => {
          const { MaxPlayers, time, Sport, Members, id } = s.s;
          {
            console.log(s.s);
          }
          return (
            <div className="row">
              <div className="col-2" style={{ textAlign: "center" }}>
                {Sport}
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                {time}
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                {MaxPlayers}
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
                {id}
              </div>
              <div className="col-2" style={{ textAlign: "center" }}>
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
                  <FaCrown size={"6rem"} />
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
          );
        })}
      </div>
    </section>
  );
};

export default JoinedRooms;
