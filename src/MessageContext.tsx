import React from "react";
import { createContext, useState } from 'react'

interface NotificationMessage {
  messageText: string,
  setMessageText: (m: string) => void
  displayMessage: boolean,
  setDisplayMessage: (b: boolean) => void
}

export const MessageContext = createContext<NotificationMessage>({
  messageText: 'message from context',
  setMessageText: () => {},
  displayMessage: false,
  setDisplayMessage: () => {}
})

interface MessageProviderProps {
  children: React.ReactChild
}

export const MessageProvider = ({ children }:MessageProviderProps) => {
  const [messageText, setMessageText] = useState('message from provider')
  const [displayMessage, setDisplayMessage] = useState(false)

  return (
    <MessageContext.Provider
      value={{
        messageText,
        setMessageText,
        displayMessage,
        setDisplayMessage
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
