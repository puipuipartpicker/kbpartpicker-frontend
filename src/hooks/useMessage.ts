import { setServers } from "dns";
import React from "react";
import { useState } from "react";

const useMessage = () => {
  const [messageText, setMessageText] = useState('')
  const [displayMessage, setDisplayMessage] = useState(false)
  return { messageText, setMessageText, displayMessage, setDisplayMessage }
}

export default useMessage