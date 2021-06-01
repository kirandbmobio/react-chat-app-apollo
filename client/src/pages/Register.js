import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Row, Col, Form, FormGroup, FormInput, Button } from "shards-react";

const REGISTER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      userInput: { username: $username, email: $email, password: $password }
    ) {
      id
      username
      email
      password
    }
  }
`;

export default function Register() {
  let [user, setUsers] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [register] = useMutation(REGISTER, {
    variables: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });

  const submitRegisterForm = (event) => {
    event.preventDefault();
    register();
  };

  const setInputValues = (event) => {
    setUsers({ ...user, [event.target.id]: event.target.value });
  };
  return (
    <Row className="bg-white m-3 py-3 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h2>Register</h2>

        <Form onSubmit={submitRegisterForm}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <FormInput
              id="username"
              placeholder="Username"
              value={user.username}
              onChange={setInputValues}
            />
          </FormGroup>
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
              Sign Up
            </Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}
