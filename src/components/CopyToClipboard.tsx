import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../MessageContext";
import './CopyToClipboard.css'

interface CopyToClipboardProps {
  buttonText: string
  stringToCopy: string
  setNotificationMessage: (message:string) => void
  setNotificationDisplay: () => void
}

const copyOnClick = async (toCopy:string) => {
  await navigator.clipboard.writeText(toCopy);
}

const CopyToClipboard = ({ buttonText, stringToCopy, setNotificationMessage, setNotificationDisplay }:CopyToClipboardProps) => {
  const [copyConfirmation, setCopyConfirmation] = useState(false)
  const {messageText, setMessageText, displayMessage, setDisplayMessage} = useContext(MessageContext) 
  
  return (
    <div className="Copy-to-clip-board">
      <button className="Copy-to-clip-board-button" 
        onClick={() => copyOnClick(stringToCopy).then(res => {
          setCopyConfirmation(true)
          setMessageText(`${buttonText} copied to clipboard`)
          setDisplayMessage(true)
        })}>
        Copy {`${buttonText}`} to clipboard
      </button>
    </div>
  )
}

export default CopyToClipboard