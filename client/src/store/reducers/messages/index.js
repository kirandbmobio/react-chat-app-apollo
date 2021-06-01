import { useMutation, gql } from "@apollo/client";

const initialState = {
  messages: [],
  message: {},
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MESSAGES":
      return { ...state };
    default:
      return state;
  }
};

// const REGISTER = gql`
//   mutation REGISTER($userInput: userInput) {
//     register(userInput: $userInput) {
//       id
//       username
//       email
//       password
//     }
//   }
// `;

export default messageReducer;
