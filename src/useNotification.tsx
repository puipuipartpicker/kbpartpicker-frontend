import React from "react";
import { useState, useEffect } from "react";

const useNotification = (message:string) => {
  const [notificationMessage, setNotificationMessage] = useState(message)
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if(display) {
      setTimeout(() => setDisplay(!display), 3000)
    }
  }, [display])
}