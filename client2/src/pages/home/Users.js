import React from "react";
import { CardImg, Col } from "shards-react";
import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";

import { useMessageDispatch, useMessageState } from "../../context/message";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      username
      email
      createdAt
      latestMessage {
        id
        from
        to
        content
      }
    }
  }
`;

export default function Users() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  let selectedUser = users?.find((u) => u.selected === true)?.username;
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let usersMarkup;
  if (!users || loading) {
    usersMarkup = <p>Loading....</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>No users join yet....</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((singleUser) => {
      let selected = selectedUser === singleUser.username;
      return (
        <div
          className={classNames("user-div d-flex p-3", {
            "bg-white": selected,
          })}
          style={{ cursor: "pointer" }}
          key={singleUser.id}
          onClick={() =>
            dispatch({
              type: "SET_SELECTED_USER",
              payload: singleUser.username,
            })
          }
        >
          <CardImg
            src="https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270"
            className="mr-2 rounded-circle"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
          <div>
            <p className="text-success">{singleUser.username}</p>
            <p className="font-weight-light">
              {singleUser.latestMessage
                ? singleUser.latestMessage.content
                : "You are now connected"}
            </p>
          </div>
        </div>
      );
    });
  }
  return (
    <Col xs={4} className="p-0 bg-secondary">
      {usersMarkup}
    </Col>
  );
}
