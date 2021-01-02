import React, {useState, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import './Search.css'
import Results from './Results'
import { IProductType } from '../types/types'
// import { sendQuery } from '../backendFunctions'
import axios from 'axios'

// import { searchResults } from '../TestData' 
import { setServers } from 'dns'

interface SearchProps {
  category: IProductType
  addItem: (selectedProduct: number) => void
}

const Search = ({ category, addItem }:SearchProps) => {
  const [resultDisplay, setResultDisplay] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [noResults, setNoResults] = useState(false)
  const searchInputEl = useRef<HTMLInputElement>(null)

  let history = useHistory()
    // console.log('history: ', history)

  const curPath = history.location.pathname

  const sendQuery = (query: string | undefined, category: IProductType):void => {
    setLoading(true)
    console.log("env", process.env.REACT_APP_API_URL)
    axios.get(`${process.env.REACT_APP_API_URL}/search`, {params: {category: category, query: query}})
    .then(response => {
      console.log('got response for query from backends: \n', response)
      console.log('response data: \n', response.data)
      console.log(response.data.data)
      if (response.data.data.length === 0) { 
        setResultDisplay(false)
        setNoResults(true)
        setSearchResults([])
      } else {
        setSearchResults(response.data.data) 
      }
      return response
    })
    .then( () => {
      setResultDisplay(true)
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
      setNoResults(false)
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
      {noResults ? <div>we found no results</div> : null}
      {resultDisplay ? <Results results={searchResults} addItem={addItem}/> : null}
    </div>
  )
}

export default Search