import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import { React, useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar2 from "./NavBar2";
const ChatRoom = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  // console.log(Location.state);
  // const { currentUser } = useAuthValue();
  // console.log(currentUser.uid);
  const [snap1, setSnap1] = useState("");
  const [currentuser, loading] = useAuthState(auth);
  // const { currentUser } = useAuthValue();
  if (loading) {
    console.log("Loading");
  } else {
    // setId(currentUser.uid);
    console.log(currentuser);
    if (currentuser === null) {
      navigate("/");
    } else ;
    // console.log(currentUser);
  }

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
  useEffect(() => {
    if (currentuser !== null) getChatRoomDetails();
  }, [currentuser, snap1]);
  return (
    <section>
      <div className="row">
        <div className="col-2 col-nav">
          <Navbar2 />
        </div>
        <div className="col-10 container2">
          <h1 style={{ textAlign: "center" }}>{snap1.Sport}</h1>
          {/* <h2>{Location.state.id}</h2>
        <h3>{snap1.time}</h3>
        <h3>{snap1.MaxPlayers}</h3> */}
          {currentuser == null ? (
            "Loading"
          ) : (
            <div className="message-container">
              {/* {console.log(
                "RoomId: ",
                Location.state.id,
                "user: ",
                currentuser
              )} */}
              <MessageList
                roomId={Location.state.id}
                user={currentuser}
              ></MessageList>
              <MessageInput
                roomId={Location.state.id}
                user={currentuser}
              ></MessageInput>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
