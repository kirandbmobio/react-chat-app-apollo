import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import { Col } from "shards-react";

import { useMessageState } from "../../context/message";

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      id
      from
      to
      content
    }
  }
`;

export default function Messages() {
  const { users } = useMessageState();
  console.log(users);
  let selectedUser = users?.find((u) => u.selected === true)?.username;
  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);
  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser]);
  return (
    <Col xs={8}>
      {messagesData && messagesData.getMessages.length > 0 ? (
        messagesData.getMessages.map((message) => (
          <p key={message.id}>{message.content}</p>
        ))
      ) : (
        <p>No Messages</p>
      )}
    </Col>
  );
}
