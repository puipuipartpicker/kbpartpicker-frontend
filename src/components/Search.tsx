import React, {useState, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import './Search.css'
import Results from './Results'
import { IProductType } from '../types/types'
import { sendQuery } from '../backendFunctions'

import { searchResults } from '../TestData' 
import { setServers } from 'dns'

interface SearchProps {
  category: IProductType
  addItem: (selectedProduct: number) => void
}
// console.log('searchResults', searchResults)


const Search = ({ category, addItem }:SearchProps) => {
  const [resultData, setResultData] = useState(false)
  const searchInputEl = useRef<HTMLInputElement>(null)

  let history = useHistory()
    // console.log('history: ', history)

  const curPath = history.location.pathname


  const getSearchResults = (e:React.FormEvent):void => {
    e.preventDefault()
    if (searchInputEl.current!.value.length) {
      // console.log('input ref', searchInputEl.current!.value)
      sendQuery(searchInputEl.current?.value, category)
      setResultData(true)
      // console.log('url to push: ', curPath.replace(/\/(.+?)\/.+/, `/$1/${searchInputEl.current!.value}`))
      history.push(curPath.replace(/(\/[^\/]+)\/?.*/, `$1/${searchInputEl.current!.value}`))
    }
  } 

  return (
    <div className="Search">
      <form onSubmit={(e) => getSearchResults(e)}>
        <input 
          className="Search__search-input" 
          type="text" 
          placeholder={`Search for ${category}`} 
          ref={searchInputEl}
        />
        <button onSubmit={(e) => getSearchResults(e)}>search</button>
      </form>
      {resultData ? <Results results={searchResults} addItem={addItem}/> : null}
    </div>
  )
}

export default Search