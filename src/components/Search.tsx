import React, {useState, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import './Search.css'
import Results from './Results'
import { IProductType } from '../types/types'
// import { sendQuery } from '../backendFunctions'
import axios from 'axios'

import { searchResults } from '../TestData' 
import { setServers } from 'dns'

interface SearchProps {
  category: IProductType
  addItem: (selectedProduct: number) => void
}
// console.log('searchResults', searchResults)


const Search = ({ category, addItem }:SearchProps) => {
  const [resultData, setResultData] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchInputEl = useRef<HTMLInputElement>(null)

  let history = useHistory()
    // console.log('history: ', history)

  const curPath = history.location.pathname

  const sendQuery = (query: string | undefined, category: IProductType):void => {
    setLoading(true)
    console.log("env", process.env.REACT_APP_API_URL)
    axios.post(`${process.env.REACT_APP_API_URL}/search`, {category: category, query: query})
    .then(response => {
      console.log('got response for query from backends: \n', response)
      console.log('response data: \n', response.data)
      return response
    })
    .then( () => {
      setResultData(true)
      setLoading(false)
    })
    .catch(error => {
      setLoading(false)
      console.log('there was an error returning query results from backend: \n', error)
    })
  }


  const handleSearchRequest = (e:React.FormEvent):void => {
    e.preventDefault()
    if (searchInputEl.current!.value.length) {
      // console.log('input ref', searchInputEl.current!.value)
      sendQuery(searchInputEl.current?.value, category)

      // console.log('url to push: ', curPath.replace(/\/(.+?)\/.+/, `/$1/${searchInputEl.current!.value}`))
      history.push(curPath.replace(/(\/[^\/]+)\/?.*/, `$1/${searchInputEl.current!.value}`))
    }
  } 

  return (
    <div className="Search">
      <form onSubmit={(e) => handleSearchRequest(e)}>
        <input 
          className="Search__search-input" 
          type="text" 
          placeholder={`Search for ${category}`} 
          ref={searchInputEl}
        />
        <button onSubmit={(e) => handleSearchRequest(e)}>search</button>
      </form>
      {loading ? <div>searching...</div> : null}
      {resultData ? <Results results={searchResults} addItem={addItem}/> : null}
    </div>
  )
}

export default Search