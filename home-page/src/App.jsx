import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import { Container } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import Chat from "chat/Chat";

const App = () => (
  <Container>
    <div>
      <p></p>
      <p>This is chat</p>
      <Chat />
    </div>
  </Container>
);

ReactDOM.render(<App />, document.getElementById("app"));
