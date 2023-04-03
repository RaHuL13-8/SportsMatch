import { Link, useLocation } from "react-router-dom";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import NavBar1 from "./NavBar1";
import { React, useEffect, useState } from "react";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { MessageInput } from "./MessageInput";
import { useAuthValue } from "../context.js";
import { MessageList } from "./MessageList";
const ChatRoom = () => {
  const Location = useLocation();
  // console.log(Location.state);
  const { currentUser } = useAuthValue();
  console.log(currentUser.uid);
  const [snap1, setSnap1] = useState("");
  const getChatRoomDetails = async () => {
    const snap = await getDoc(doc(db, "Rooms", Location.state.id));

    if (snap.exists()) {
      // console.log(snap.data());
      if (snap1 === "") {
        setSnap1(snap.data());
      }
    } else {
      console.log("No such document");
    }
    return snap.data();
  };
  getChatRoomDetails();
  return (
    <section>
      <NavBar1 />
      <div className="container1">
        <h1>{snap1.Sport}</h1>
        {/* <h2>{Location.state.id}</h2>
        <h3>{snap1.time}</h3>
        <h3>{snap1.MaxPlayers}</h3> */}
        <div className="messages-container">
          <MessageList
            roomId={Location.state.id}
            user={currentUser}
          ></MessageList>
          <MessageInput
            roomId={Location.state.id}
            user={currentUser}
          ></MessageInput>
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
