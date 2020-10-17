import React from 'react'

interface SearchProps {
  category: string
  theme: string
}

const Search = ({ theme, category }:SearchProps) => {
  return (
    <div className="Search">
      <input type="text" defaultValue={`Search for ${category}`}/>
      <p>this should be the theme: {theme}</p>
    </div>
  )
}

export default Search