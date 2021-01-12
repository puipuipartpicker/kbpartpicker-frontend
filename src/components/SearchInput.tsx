import React, { useState, useRef, KeyboardEvent } from 'react'
import './SearchInput.css'

const SearchInput = () => {
  const [inputText, setInputText] = useState('')
  const [lastLetter, setLastLetter] = useState('')
  const [carotOffset, setCarotOffset] = useState(0)
  const [inputLength, setInputLength] = useState(0)
  const searchInputEl = useRef<HTMLInputElement>(null)

  const handleInputChange = () => {
    console.log('selection start:', searchInputEl.current?.selectionStart)
    if(searchInputEl.current?.value.length) {
      setInputLength(searchInputEl.current?.value.length)
    }
    if (searchInputEl.current?.selectionStart) {
      setCarotOffset(searchInputEl.current?.selectionStart)
    }
    if (searchInputEl.current?.selectionStart === 0) {
      setCarotOffset(0)
    }
  }

  const handleKeypress = (event:KeyboardEvent) => {
    console.log('carot offset:', carotOffset)
    console.log(event)
    if((event.key === 'ArrowLeft' && !event.metaKey) || (event.key === 'b' && event.ctrlKey)) {
      if(searchInputEl.current?.value.length) {
        setCarotOffset(curOffset => curOffset - 1 >= 0 ? curOffset - 1 : 0)
      }
    }
    if((event.key === 'ArrowLeft' && event.metaKey) || (event.key === 'a' && event.ctrlKey)) {
      setCarotOffset(0)
    }
    if((event.key === 'ArrowRight' && !event.metaKey) || (event.key === 'f' && event.ctrlKey)) {
      if(searchInputEl.current?.value.length) {
        if(carotOffset + 1 <= searchInputEl.current?.value.length)
        setCarotOffset(curOffset => curOffset + 1)
      }
    }
    if((event.key === 'ArrowRight' && event.metaKey) || (event.key === 'e' && event.ctrlKey)) {
      console.log(searchInputEl.current?.selectionEnd)
      if(searchInputEl.current?.value) {
        console.log('search input length:', searchInputEl.current.value.length)
        console.log('state input length', inputLength)
        setCarotOffset(searchInputEl.current.value.length)
      }
    }
    // TODO: support for skipping to next word
  }

  return (
    <div className="SearchInput">
      <div className="SearchInput__inner">
        <input 
        className="SearchInput__inputEl --text" 
        type="text" 
        placeholder="search here..."
        onChange={() => handleInputChange()}
        onClick={() => handleInputChange()}
        onKeyDown={(event) => handleKeypress(event)}
        ref={searchInputEl}
        />
        <div 
          className="SearchInput__carot"
          style={{left: `${carotOffset ? (carotOffset * 14.45555) + 4 : 2}px`}}  
        >
        </div>
      </div>
    </div>
  )
}

export default SearchInput