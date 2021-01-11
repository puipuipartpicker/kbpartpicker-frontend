import React, { useEffect, useState, useRef } from 'react'
import './SearchInput.css'

const SearchInput = () => {
  const [inputText, setInputText] = useState('')
  const [lastLetter, setLastLetter] = useState('')
  const [carotOffset, setCarotOffset] = useState(0)
  const [inputLength, setInputLength] = useState(0)
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
    if(searchInputEl.current?.value.length) {
      setInputLength(searchInputEl.current?.value.length)
    }
    if (searchInputEl.current?.selectionStart) {
      setCarotOffset(searchInputEl.current?.selectionStart)
    }
    // if (searchInputEl.current?.selectionStart === 0) {
    //   setCarotOffset(0)
    // }
  }

  const handleKeypress = (event:KeyboardEvent) => {
    if (document.activeElement) {
      if([...document.activeElement.classList].includes('SearchInput__inputEl')) {
        console.log(event)
        console.log('carot offset:', carotOffset)
        if(event.code === 'ArrowLeft' && !event.metaKey) {
          if(searchInputEl.current?.value.length && (searchInputEl.current.value.length - 1) >= 0) {
            setCarotOffset(curOffset => curOffset - 1)
          }
        }
        if(event.code === 'ArrowLeft' && event.metaKey) {
          setCarotOffset(0)
        }
        if(event.code === 'ArrowRight' && !event.metaKey) {
          if(searchInputEl.current?.value.length) {
            if(carotOffset + 1 <= searchInputEl.current?.value.length)
            setCarotOffset(curOffset => curOffset + 1)
          }
        }
        if(event.code === 'ArrowRight' && event.metaKey) {
          console.log(searchInputEl.current?.selectionEnd)
          if(searchInputEl.current?.selectionEnd) {
            console.log('search input length:', searchInputEl.current.value.length)
            console.log('state input length', inputLength)
            setCarotOffset(searchInputEl.current.value.length)
          }
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (event) => handleKeypress(event))
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