import React, {useState} from 'react'
import './Search.css'
import Results from './Results'

import { searchResults } from '../TestData' 

interface SearchProps {
  category: string
  theme: string
}
console.log('searchResults', searchResults)

const Search = ({ theme, category }:SearchProps) => {
  const [resultData, setResultData] = useState(false)
  return (
    <div className={`Search ${theme}`}>
      <input className="Search__seach-input" type="text" placeholder={`Search for ${category}`}/>
      <button onClick={() => setResultData(!resultData)}>search</button>
      <p>this should be the theme: {theme}</p>
      {resultData ? <Results results={searchResults}/> : null}
    </div>
  )
}

export default Search