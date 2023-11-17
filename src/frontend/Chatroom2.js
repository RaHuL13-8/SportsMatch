import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../backend/firebase";
import { auth } from "../backend/firebase";
import Navbar1 from "./NavBar1";
import { React, useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar2 from "./NavBar2";
import { useMediaQuery } from "react-responsive";
const Chatroom2 = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  // console.log(Location.state);
  // const { currentUser } = useAuthValue();
  // console.log(currentUser.uid);
  const [snap1, setSnap1] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const [currentuser, loading] = useAuthState(auth);

  const logo = {
    Cricket: "CricketLogo.jpeg",
    Football: "FootballLogo.jpg",
    Hockey: "HockeyLogo.jpg",
    Kabaddi: "KabbadiLogo.png",
    Volleyball: "VolleyBallLogo.jpg",
    Tennis: "TennisLogo.jpg",
    Badminton: "BadmintonLogo.jpg",
    Basketball: "BasketballLogo.jpg",
    TableTennis: "TableTennisLogo.jpg",
  };
  // const { currentUser } = useAuthValue();
  if (loading) {
    console.log("Loading");
  } else {
    // setId(currentUser.uid);
    // console.log(currentuser);
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
      {!isMobile ? (
        <div className="row">
          <div className="col-2 col-nav">
            <Navbar2 />
          </div>
          <div className="col-10 container2">
            {currentuser == null ? (
              "Loading"
            ) : (
              <div className="container-chatbox">
                <div className="msg-header">
                  <div className="container-match">
                    <img src={logo[snap1.Sport]} className="msgimg"></img>
                    <div className="active">
                      <h1>{snap1.Sport}</h1>
                    </div>
                  </div>
                </div>
                <div className="chat-page">
                  <div className="msg-inbox">
                    <div className="chats">
                      <div className="msg-page">
                        <MessageList
                          roomId={Location.state.id}
                          user={currentuser}
                        ></MessageList>
                      </div>
                    </div>
                    <div className="msg-bottom">
                      <MessageInput
                        roomId={Location.state.id}
                        user={currentuser}
                      ></MessageInput>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <article>
          <Navbar1></Navbar1>
          <div className="container-mobile">
            <div className="msg-header">
              <div className="container-match">
                <img src="bat_ball.jpg" className="msgimg"></img>
                <div className="active">
                  <h1>{snap1.Sport}</h1>
                </div>
              </div>
            </div>
            <div className="chat-page">
              <div className="msg-inbox">
                <div className="chats">
                  <div className="msg-page">
                    <MessageList
                      roomId={Location.state.id}
                      user={currentuser}
                    ></MessageList>
                  </div>
                </div>
                <div className="msg-bottom">
                  <MessageInput
                    roomId={Location.state.id}
                    user={currentuser}
                  ></MessageInput>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default Chatroom2;
