import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      console.log(action.content);
      return {
        ...state,
        content: `You voted for "${action.content}"`,
      };
    case "CREATE":
      return {
        ...state,
        content: action.content,
      };
    case "ERROR":
      return {
        ...state,
        content: "An error occurred while logging in",
      };
    case "CLEAR":
      return {
        ...state,
        content: "",
      };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotificationContext);
  return counterAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext);
  return counterAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
