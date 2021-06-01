import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Row, Col, Form, FormGroup, FormInput, Button } from "shards-react";

import { useAuthDispatch } from "../context/auth";

import fetch from "node-fetch";

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      password
      token
    }
  }
`;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function Login(props) {
  let dispatch = useAuthDispatch();
  let [user, setUsers] = useState({
    email: "",
    password: "",
  });
  let [attachment, setNewAttachment] = useState(null);
  // Lazy query for login user method
  const [login, { loading }] = useLazyQuery(LOGIN, {
    onCompleted(data) {
      dispatch({ type: "LOGIN", payload: data.login });
      props.history.push("/");
    },
    variables: {
      email: user.email,
      password: user.password,
    },
  });
  //   let { data } = useQuery(LOGIN, {

  //   });

  const submitLoginForm = (event) => {
    event.preventDefault();
    login();
  };

  const setInputValues = (event) => {
    setUsers({ ...user, [event.target.id]: event.target.value });
  };

  const fileUpload = () => {};

  return (
    <Row className="bg-white m-3 py-3 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h2 className="text-center">Login</h2>

        <Form onSubmit={submitLoginForm}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <FormInput
              type="email"
              id="email"
              placeholder="E-mail"
              value={user.email}
              onChange={setInputValues}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <FormInput
              type="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={setInputValues}
            />
          </FormGroup>
          <FormGroup>
            <Button outline className="text-center">
              LogIn
            </Button>
            <br />
            <small>
              Don't have an account ? <Link to="/register">Register</Link>
            </small>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}
