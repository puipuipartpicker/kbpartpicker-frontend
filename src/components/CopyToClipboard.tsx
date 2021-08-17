import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../MessageContext";
import { ReactComponent as ClipBoard } from '../svg/icon-clipboard.svg'
import './CopyToClipboard.css'

interface CopyToClipboardProps {
  buttonText: string
  stringToCopy: string
}

const copyOnClick = async (toCopy:string) => {
  await navigator.clipboard.writeText(toCopy);
}

const CopyToClipboard = ({ buttonText, stringToCopy }:CopyToClipboardProps) => {
  const [copyConfirmation, setCopyConfirmation] = useState(false)
  const {messageText, setMessageText, displayMessage, setDisplayMessage} = useContext(MessageContext) 

  return (
    <div className="Copy-to-clip-board">
      <button className="Copy-to-clip-board-button" 
        onClick={() => {
          if (!displayMessage) {
            copyOnClick(stringToCopy).then(res => {
              setCopyConfirmation(true)
              setMessageText(`${buttonText} copied to clipboard`)
              setDisplayMessage(true)
            })
          }}}>
        <ClipBoard className="--inverse" /> Copy {`${buttonText}`} to clipboard
      </button>
    </div>
  )
}

export default CopyToClipboard