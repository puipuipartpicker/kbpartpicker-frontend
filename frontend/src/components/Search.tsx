import React, {useState} from 'react'
import './Search.css'
import Results from './Results'

import searchResults from '../TestData'


interface SearchProps {
  category: string
  theme: string
}
console.log('searchResults', searchResults)

const Search = ({ theme, category }:SearchProps) => {
  const [resultData, setResultData] = useState(false)
  return (
    <div className="Search">
      <input className="Search__seach-input" type="text" placeholder={`Search for ${category}`}/>
      {/* <button onClick={() => setResultData(true)}>search</button> */}
      <p>this should be the theme: {theme}</p>
      //@ts-ignore
      <Results results={searchResults}/>
    </div>
  )
}

export default Search