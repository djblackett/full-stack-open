import { createContext, useContext, useReducer } from "react";
import { setToken } from "../requests";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // console.log(action.content);
      return action.user;
    case "LOGOUT":
      return null;
    // case "ERROR":
    //   return {
    //     ...state,
    //     content: "An error occurred while logging in",
    //   };
    // case "CLEAR":
    //   return {
    //     ...state,
    //     content: "",
    //   };
    default:
      return state;
  }
};

const UserContext = createContext();

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
