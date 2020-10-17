import React from 'react'
import './Search.css'

import searchResults from '../TestData'
  
interface SearchProps {
  category: string
  theme: string
}

const Search = ({ theme, category }:SearchProps) => {
  return (
    <div className="Search">
      <input className="Search__seach-input" type="text" placeholder={`Search for ${category}`}/>
      <p>this should be the theme: {theme}</p>
      {searchResults.results.map(product => product.id)}
    </div>
  )
}

export default Search