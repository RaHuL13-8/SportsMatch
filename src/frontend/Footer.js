import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import { signOut } from "firebase/auth";
import { auth } from "../backend/firebase";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
const Footer = () => {
  return (
    <section className="footer">
      <br />
      <div className="row">
        <div className="col-4"></div>
        <div className="col-1">
          <BsInstagram style={{ color: "white" }} size={"3rem"} />
        </div>
        <div className="col-1">
          <BsFacebook style={{ color: "white" }} size={"3rem"} />
        </div>
        <div className="col-1">
          <BsTwitter size={"3rem"} color="white"></BsTwitter>
        </div>
      </div>
    </section>
  );
};

export default Footer;
