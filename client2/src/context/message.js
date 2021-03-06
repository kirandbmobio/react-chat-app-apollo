import React, { createContext, useReducer, useContext } from "react";

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_USER_MESSAGES":
      const { username, messages } = action.payload;
    case "SET_SELECTED_USER":
      console.log("action.payload");
      const userCopy = state.users.map((user) => ({
        ...user,
        selected: user.username === action.payload,
      }));
      return { ...state, users: userCopy };
    default:
      throw new Error(`Unknown Action Type: ${action.type}`);
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null });
  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageStateContext);
export const useMessageDispatch = () => useContext(MessageDispatchContext);
