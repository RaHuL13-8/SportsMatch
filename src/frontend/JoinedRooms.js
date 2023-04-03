import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar1 from "./NavBar1";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import { useAuthValue } from "../context.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
} from "firebase/firestore";

const JoinedRooms = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthValue();
  const [listOfRooms, setListOfRooms] = useState([]);
  const [update, setUpdate] = useState(0);
  // console.log(currentUser);
  const uid = currentUser.uid;
  var info = [];
  const getListOfRooms = async () => {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setListOfRooms(docSnap.data().Chatrooms);
      // console.log(listOfRooms);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
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
    console.log(s.s);
    console.log(uid);
    await updateDoc(docRef, {
      Chatrooms: arrayRemove(s),
    });

    const room = doc(db, "Rooms", s.s.id);

    await updateDoc(room, {
      Members: arrayRemove(uid),
    });
  };
  useEffect(() => {
    getListOfRooms();
  }, [LeaveChatroom]);

  return (
    <section>
      <Navbar1 />
      <div className="container1">
        {console.log(listOfRooms)}
        {listOfRooms.map((s) => {
          const { MaxPlayers, time, Sport, Members, id } = s.s;
          {
            console.log(s.s);
          }
          return (
            <div className="row">
              <div className="col-2">{Sport}</div>
              {/* <div className="col-3">{Time}</div> */}
              <div className="col-2">{MaxPlayers}</div>
              <div className="col-2">{id}</div>
              <div className="col-3">
                <button
                  type="button"
                  className="btn-h btn btn-success"
                  style={{ textAlign: "center" }}
                  onClick={() => goToChatroom({ id })}
                >
                  Join
                </button>
              </div>
              <div className="col-3">
                <button
                  type="button"
                  className="btn-h btn btn-danger"
                  style={{ textAlign: "center" }}
                  onClick={() => LeaveChatroom({ s })}
                >
                  Leave
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default JoinedRooms;
