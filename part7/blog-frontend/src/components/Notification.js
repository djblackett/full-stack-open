import React from "react";
import { useNotificationValue } from "./NotificationContext";
const Notification = ({ isError }) => {
  const notification = useNotificationValue();

  if (!notification.content) {
    return null;
  }
  return (
    <p
      style={{
        fontSize: 16,
        color: isError ? "red" : "green",
        padding: "5px",
        borderWidth: "3px",
        borderStyle: "solid",
        borderColor: isError ? "red" : "green",
      }}
      id="login-success"
    >
      {notification.content}
    </p>
  );
};

export default Notification;
