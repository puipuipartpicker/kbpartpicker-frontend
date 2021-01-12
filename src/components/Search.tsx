import React, {useState, useRef, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import './Search.css'
import Results from './Results'
import TerminalInput from './TerminalInput'
import { IProductType } from '../types/types'
// import { sendQuery } from '../backendFunctions'
import axios from 'axios'

// import { searchResults } from '../TestData' 
import { setServers } from 'dns'

interface SearchProps {
  category: IProductType
  addItem: (selectedProduct: string) => void
}

const Search = ({ category, addItem }:SearchProps) => {
  const [resultDisplay, setResultDisplay] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [noResults, setNoResults] = useState(false)
  const searchInputEl = useRef<HTMLInputElement>(null)
  let history = useHistory()
  const curPath = history.location.pathname

  const sendQuery = (query: string | undefined, category: IProductType):void => {
    setLoading(true)
    console.log("env", process.env.REACT_APP_API_URL)
    axios.get(`${process.env.REACT_APP_API_URL}/search`, {params: {category: category, query: query}})
    .then(response => {
      console.log('got response for query from backends: \n', response)
      console.log('response data: \n', response.data)
      console.log(response.data)
      if (response.data.length === 0) { 
        setResultDisplay(false)
        setNoResults(true)
        setSearchResults([])
      } else {
        setSearchResults(response.data) 
      }
      return response
    })
    .then(() => {
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

  useEffect(() => {
    console.log('HISTORY', curPath)
    const pathRegex = new RegExp(`\/${category}\/(.+)`, 'i')
    console.log('PATH REGEX', pathRegex)
    console.log(pathRegex.test(curPath))
    if(pathRegex.test(curPath)) {
      const queryValue = curPath.match(pathRegex)
      console.log('QUERY VALUE', queryValue)
      if(queryValue![1]) {
        sendQuery(queryValue![1], category)
      }
    }
  }, [])

  return (
    <div className="Search">
      <TerminalInput/>
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