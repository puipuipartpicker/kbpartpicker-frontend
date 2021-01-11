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
    if(event.key === 'ArrowLeft' && !event.metaKey) {
      if(searchInputEl.current?.value.length) {
        setCarotOffset(curOffset => curOffset - 1 >= 0 ? curOffset - 1 : 0)
      }
    }
    if(event.key === 'ArrowLeft' && event.metaKey) {
      setCarotOffset(0)
    }
    if(event.key === 'ArrowRight' && !event.metaKey) {
      if(searchInputEl.current?.value.length) {
        if(carotOffset + 1 <= searchInputEl.current?.value.length)
        setCarotOffset(curOffset => curOffset + 1)
      }
    }
    if(event.key === 'ArrowRight' && event.metaKey) {
      console.log(searchInputEl.current?.selectionEnd)
      if(searchInputEl.current?.value) {
        console.log('search input length:', searchInputEl.current.value.length)
        console.log('state input length', inputLength)
        setCarotOffset(searchInputEl.current.value.length)
      }
    }
    // TODO: add support for emacs 
    // https://www.johndcook.com/blog/emacs_move_cursor/
    // if((event.key === 'a' || event.key === 'b' || event.key === 'e' || event.key === 'f') && event.ctrlKey) {
    //   if(searchInputEl.current?.selectionStart) {
    //     console.log(searchInputEl.current?.selectionStart)
    //     setCarotOffset(searchInputEl.current?.selectionStart)
    //   }
    // }
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
          style={{left: `${carotOffset ? (carotOffset * 14.45555) + 4 : 5}px`}}  
        >
        </div>
      </div>
    </div>
  )
}

export default SearchInput