import { React, useEffect, useState } from "react";
import Navbar1 from "./NavBar1";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../backend/firebase";
import { useAuthValue } from "../context.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Navbar2 from "./NavBar2";
import Footer from "./Footer";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  increment,
} from "firebase/firestore";
import { db } from "../backend/firebase";
export default function Profile() {
  // const user = auth.currentUser;
  const [user, loading] = useAuthState(auth);
  const [total_match, setTotalMatch] = useState(0);
  const [topMatch, setTopMatch] = useState([]);
  const getTotalMatches = async () => {
    const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    setTotalMatch(docSnap.data().total_matches);
  };
  const getList = async () => {
    const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data().TopSport);
    const TopSport = docSnap.data().TopSport;
    let sortable = [];
    for (var Sport in TopSport) {
      sortable.push([Sport, TopSport[Sport]]);
    }
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    const slicedArray = sortable.slice(0, 4);
    setTopMatch(slicedArray);
  };
  // if (user !== null) {
  //   displayName = user.displayName;
  //   email = user.email;
  //   FavSport = user.FavSport;
  //   const uid = user.uid;
  //   // console.log(user);
  // }
  // const { currentUser } = useAuthValue();
  // console.log(currentUser.uid);

  useEffect(() => {
    getTotalMatches();
  }, []);
  useEffect(() => {
    getList();
  }, []);
  return (
    <section>
      {loading ? (
        "Loading"
      ) : (
        <div className="row">
          {console.log(topMatch)}
          <div className="col-2 col-nav">
            <Navbar2 />
          </div>
          <div className="col-10 c2">
            <div className="row">
              <div className="col-5">
                <div className="img-circle2">
                  <img
                    src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                    alt=""
                    width="400"
                    height="400"
                  />
                </div>
              </div>
              <div className="col-7 ">
                <div className="prof-name">
                  <h1 style={{ fontSize: "120px", color: "gray" }}>
                    {user.displayName}
                  </h1>
                  <h3 style={{ color: "gray" }}> {user.email}</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-9">
                <div
                  className="card-social"
                  style={{ marginTop: "300px", marginLeft: "225px" }}
                >
                  <div className="card-title">
                    <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
                      Stats
                    </h1>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-4">
                        <h3 style={{ textAlign: "center" }}>
                          Total Matches Played
                        </h3>
                        <h3 style={{ textAlign: "center", fontSize: "100px" }}>
                          {" "}
                          {total_match}
                        </h3>
                      </div>
                      <div className="col-4">
                        <h3 style={{ textAlign: "center" }}>Daily Streak</h3>
                        <h3 style={{ textAlign: "center", fontSize: "100px" }}>
                          0
                        </h3>
                      </div>
                      <div className="col-4">
                        <h3 style={{ textAlign: "center" }}>
                          4 Most Played Games
                        </h3>
                        {topMatch.map((game) => {
                          return (
                            <h5 style={{ textAlign: "center" }}>
                              {game[0]}:{game[1]}
                            </h5>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="card-social" style={{ marginTop: "300px" }}>
                  <div className="card-title">
                    <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
                      Social Status
                    </h1>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-7">
                        <h3 style={{ textAlign: "center" }}>Following</h3>
                        <h3 style={{ textAlign: "center", fontSize: "100px" }}>
                          0
                        </h3>
                      </div>
                      <div className="col-4">
                        <h3 style={{ textAlign: "center" }}>Followers</h3>
                        <h3 style={{ textAlign: "center", fontSize: "100px" }}>
                          0
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer></Footer>
          </div>
        </div>
      )}
    </section>
  );
}
