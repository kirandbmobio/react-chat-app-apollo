import { registerUser } from "./actions";

const initialState = {
  users: [],
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      let user = registerUser(action.payload);
      state.user = user;
      return { ...state };
    default:
      return state;
  }
};

export default userReducer;
