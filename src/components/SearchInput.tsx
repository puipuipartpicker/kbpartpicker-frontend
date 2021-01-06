import React, { useEffect, useState, useRef } from 'react'
import './SearchInput.css'

const SearchInput = () => {
  const [inputText, setInputText] = useState('')
  const [lastLetter, setLastLetter] = useState('')
  const [letterWidth, setLetterWidth] = useState(0)
  const searchInputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputText.length > 0) {
      setLastLetter(inputText[inputText.length - 1])
    } else {
      setLastLetter('')
    }
    console.log(lastLetter)
    console.log(letterWidth)
  }, [inputText])

  useEffect(() => {
    if (document.querySelector('.SearchInput__input-letters_last-letter')) {
      //@ts-ignore
      const lastLetterWidth = document.querySelector('.SearchInput__input-letters_last-letter').offsetWidth
      if (lastLetterWidth !== 0) {
        setLetterWidth(lastLetterWidth)
      } else {
        setLetterWidth(6)
      }
    }
  }, [lastLetter])

  return (
    <div className="SearchInput">
      <div className="SearchInput__inner">
      <div className="testing" contentEditable="true">{inputText}</div>
        <div className="SearchInput__input-letters --text">
          {inputText.replace(/.$/, '')}
          <span className="SearchInput__input-letters_last-letter">
            {lastLetter}
            <div 
              className={`SearchInput__carot ${lastLetter === '' ? '--inactive' : ''}`}
              style={{left: `${letterWidth + 0.5}px`}}  
            ></div>
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
    </div>
  )
}

export default SearchInput