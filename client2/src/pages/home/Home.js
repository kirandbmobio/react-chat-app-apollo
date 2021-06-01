import React, { useState, useEffect } from "react";
import { Row, Button } from "shards-react";
import { Link } from "react-router-dom";

import Users from "./Users";
import Messages from "./Messages";

import { useAuthDispatch } from "../../context/auth";

export default function Home(props) {
  let dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    props.history.push("/login");
  };

  return (
    <>
      <Row className="justify-content-around bg-white mb-1 p-2">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Button onClick={logout}>Logout</Button>
      </Row>
      <Row className="bg-white p-2">
        <Users />
        <Messages />
      </Row>
    </>
  );
}
