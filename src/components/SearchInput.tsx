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

  const handleKeypress = () => {

  }

  useEffect(() => {
    document.addEventListener('keydown', () => console.log(searchInputEl))
  },[])

  return (
    <div className="SearchInput">
      <div className="SearchInput__inner">
        <input 
        className="SearchInput__inputEl --text" 
        type="text" 
        placeholder="placeholder or search input component"
        onChange={() => handleInputChange()}
        onClick={() => handleInputChange()}
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