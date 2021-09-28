import { setServers } from "dns";
import React from "react";
import { useState } from "react";

const useMessage = (newMessageText?:string, newDisplayMessage?:boolean) => {
  const [messageText, setMessageText] = useState('')
  const [displayMessage, setDisplayMessage] = useState(false)

  if (typeof newMessageText === 'string') {
    setMessageText(newMessageText)
  }
  if (typeof newDisplayMessage === 'boolean') {
    setDisplayMessage(newDisplayMessage)
  }

  return { messageText, setMessageText, displayMessage, setDisplayMessage }
}

export default useMessage