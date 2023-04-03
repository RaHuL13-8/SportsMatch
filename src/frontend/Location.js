import { React, useEffect, useState, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import { collection, setDoc, doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useAuthValue } from "../context.js";
import { auth, db } from "../backend/firebase";

const UpdateLocation = () => {
  const navigate = useNavigate();
  const [currLocation, setCurrLocation] = useState({});
  const { currentUser } = useAuthValue();
  const id = currentUser.uid;
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setCurrLocation({ latitude, longitude });
    });

    await updateDoc(doc(db, "Users", id), {
      latitude: currLocation.latitude,
      longitude: currLocation.longitude,
    });

    navigate("/Home");
  };

  useEffect(() => {
    getLocation();
  });
};
export default UpdateLocation;
