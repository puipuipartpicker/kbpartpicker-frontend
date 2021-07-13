import React, { useState, useEffect } from "react";
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
  return (
    <div className="Copy-to-clip-board">
      <button className="Copy-to-clip-board-button" 
        onClick={() => copyOnClick(stringToCopy).then(res => {
          setCopyConfirmation(true)
          setNotificationMessage(`${buttonText} copied to clipboard`)
          setNotificationDisplay()
        })}>
        Copy {`${buttonText}`} to clipboard
      </button>
    </div>
  )
}

export default CopyToClipboard