import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import { Container } from "shards-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { createHttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "apollo-link-context";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

import "./index.css";

const App = (props) => {
  return (
    <ApolloProvider client={client} {...props}>
      <Provider store={store}>
        <Router>
          <Container className="pt-5">
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Home} />
            </Switch>
          </Container>
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
