import React from "react";
import './Notification.css'

interface NotificationProps {
  message: string
}

const Notification = ({ message }:NotificationProps) => (
  <div className="Notification">
    <div className="Notification-message">{message}</div>
  </div>
)

export default Notification