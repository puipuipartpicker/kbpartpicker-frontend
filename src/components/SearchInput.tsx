import React, { useEffect, useState, useRef } from 'react'
import './SearchInput.css'

const SearchInput = () => {
  const [inputText, setInputText] = useState('')
  const [lastLetter, setLastLetter] = useState('')
  const searchInputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputText.length > 0) {
      setLastLetter(inputText[inputText.length - 1])
    } else {
      setLastLetter('')
    }
  }, [inputText])

  return (
    <div className="SearchInput">
      <div className="SearchInput__input-letters --text">
        {inputText.replace(/.$/, '')}
        <span className="SearchInput__input-letters_last-letter">
          {lastLetter}
          <div className={`SearchInput__carot ${lastLetter === '' ? '--inactive' : ''}`}></div>
        </span>
      </div>
      <input 
        className="SearchInput__inputEl --text" 
        type="text" 
        placeholder="placeholder or search input component"
        onChange={(event) => setInputText(event.target.value)}
        ref={searchInputEl}
        />
        <input 
        className="SearchInput__inputEl --text" 
        type="text" 
        placeholder="placeholder or search input component"
        onChange={(event) => setInputText(event.target.value)}
        ref={searchInputEl}
        />
    </div>
  )
}

export default SearchInput