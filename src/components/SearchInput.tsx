import React, { useEffect, useState, useRef } from 'react'
import './SearchInput.css'

const SearchInput = () => {
  const [inputText, setInputText] = useState('')
  const [lastLetter, setLastLetter] = useState('')
  const [carotOffset, setCarotOffset] = useState(0)
  const searchInputEl = useRef<HTMLInputElement>(null)


  useEffect(() => {
    if (inputText.length > 0) {
      setLastLetter(inputText[inputText.length - 1])
    } else {
      setLastLetter('')
    }
  }, [inputText])

  // useEffect(() => {
  //   if (document.querySelector('.SearchInput__input-letters_last-letter')) {
  //     //@ts-ignore
  //     const lastLetterWidth = document.querySelector('.SearchInput__input-letters_last-letter').offsetWidth
  //     if (lastLetterWidth !== 0) {
  //       setLetterWidth(lastLetterWidth)
  //     } else {
  //       setLetterWidth(6)
  //     }
  //   }
  // }, [lastLetter])

  const handleInputChange = () => {
    console.log(searchInputEl)
    console.log(searchInputEl.current?.selectionStart)
    if (searchInputEl.current?.selectionStart) {
      // 16 is the width of each letter 
      setCarotOffset(searchInputEl.current?.selectionStart)
    }
    if (searchInputEl.current?.selectionStart === 0) {
      setCarotOffset(0)
    }
  }

  useEffect(() => {
    handleInputChange()
  },[])

  return (
    <div className="SearchInput">
      <div className="SearchInput__inner">
        {/** TODO: 
         * consider using contentEditable instead of text input
          <div className="testing" contentEditable="true">
          {inputText}
          <span>Test</span>
        </div> */}
        {/* <div className="SearchInput__input-letters --text">
          {inputText ? inputText.replace(/.$/, '') : 'search here:'}
          <span className="SearchInput__input-letters_last-letter">
            {lastLetter}
            <div 
              className={`SearchInput__carot ${lastLetter === '' ? '--inactive' : ''}`}
              style={{left: `${letterWidth + 0.5}px`}}  
            ></div>
          </span>
        </div> */}
        <input 
        className="SearchInput__inputEl --text" 
        type="text" 
        placeholder="placeholder or search input component"
        onChange={() => handleInputChange()}
        ref={searchInputEl}
        />
        <div 
          className="SearchInput__carot"
          style={{left: `${carotOffset ? carotOffset * 15 : 5}px`}}  
        >
        </div>
      </div>
    </div>
  )
}

export default SearchInput