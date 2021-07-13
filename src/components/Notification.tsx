import React from "react";
import './Notification.css'

interface NotificationProps {
  message: string
}

const Notification = ({ message }:NotificationProps) => <div className="Notification">{message}</div>

export default Notification