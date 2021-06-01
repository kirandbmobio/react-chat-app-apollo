import { useMutation, gql } from "@apollo/client";

export const registerUser = (payload) => {
  console.log("payload", payload);
  const { register } = useMutation(REGISTER, { variables: payload });
  console.log("register", register);

  return { register };
};

const REGISTER = gql`
  mutation REGISTER($userInput: userInput) {
    register(userInput: $userInput) {
      id
      username
      email
      password
    }
  }
`;
