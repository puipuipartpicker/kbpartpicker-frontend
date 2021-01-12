import React, { useState, useRef, KeyboardEvent } from 'react'
import './TerminalInput.css'

interface TerminalInputProps {
  passValue?: (curInputValue: string) => void
  placeholder?: string
  type: string
}

const TerminalInput = ({ passValue, placeholder, type }:TerminalInputProps) => {
  const [carotOffset, setCarotOffset] = useState(0)
  const terminalInputEl = useRef<HTMLInputElement>(null)

  const handleInputChange = () => {
    console.log('selection start:', terminalInputEl.current?.selectionStart)
    if (terminalInputEl.current?.selectionStart) {
      setCarotOffset(terminalInputEl.current?.selectionStart)
    }
    if (terminalInputEl.current?.selectionStart === 0) {
      setCarotOffset(0)
    }
    if(passValue) {
      if(terminalInputEl.current?.value) {
        passValue(terminalInputEl.current?.value)
      }
    }
  }

  const handleKeypress = (event:KeyboardEvent) => {
    console.log('carot offset:', carotOffset)
    console.log('event:' , event)
    if((event.key === 'ArrowLeft' && !event.metaKey) || (event.key === 'b' && event.ctrlKey)) {
      if(terminalInputEl.current?.value.length) {
        setCarotOffset(curOffset => curOffset - 1 >= 0 ? curOffset - 1 : 0)
      }
    }
    if((event.key === 'ArrowLeft' && event.metaKey) || (event.key === 'a' && event.ctrlKey)) {
      setCarotOffset(0)
    }
    if((event.key === 'ArrowRight' && !event.metaKey) || (event.key === 'f' && event.ctrlKey)) {
      if(terminalInputEl.current?.value.length) {
        if(carotOffset + 1 <= terminalInputEl.current?.value.length)
        setCarotOffset(curOffset => curOffset + 1)
      }
    }
    if((event.key === 'ArrowRight' && event.metaKey) || (event.key === 'e' && event.ctrlKey)) {
      if(terminalInputEl.current?.value) {
        console.log('search input length:', terminalInputEl.current.value.length)
        setCarotOffset(terminalInputEl.current.value.length)
      }
    }
    // TODO: support for skipping to next word
  }

  return (
    <div className="TerminalInput">
      <input 
      className="TerminalInput__inputEl" 
      type={type}
      placeholder={placeholder ? placeholder : "input text here..."}
      onChange={() => handleInputChange()}
      onClick={() => handleInputChange()}
      onKeyDown={(event) => handleKeypress(event)}
      ref={terminalInputEl}
      />
      <div 
        className="TerminalInput__carot"
        style={{left: `${carotOffset ? carotOffset * 14.45555 : 0}px`}}  
      >
      </div>
    </div>
  )
}

export default TerminalInput