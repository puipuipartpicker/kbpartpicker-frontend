import React, { useState, useEffect } from "react";
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
  return (
    <div className="Copy-to-clip-board">
      <button className="Copy-to-clip-board-button" 
        onClick={() => copyOnClick(stringToCopy).then(res => setCopyConfirmation(true))}>
        Copy {`${buttonText}`} to clipboard
      </button>
      {copyConfirmation ? <div className="Copy-to-clip-board-confirmation">{`${buttonText}`} copied to clipboard</div> : null}
    </div>
  )
}

export default CopyToClipboard