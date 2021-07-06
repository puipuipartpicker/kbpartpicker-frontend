import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import './Search.css'
import Results from './Results'
import TerminalInput from './TerminalInput'
import JumpTo from './JumpTo'
import { IProductType } from '../types/types'
import axios from 'axios'
import { handleParameterUpdate } from '../helperFunctions'

// import { setServers } from 'dns'

interface SearchProps {
  bar: boolean
  category: IProductType
  addItem: (selectedProduct: string) => void
}

const Search = ({ bar, category, addItem }:SearchProps) => {
  const [resultDisplay, setResultDisplay] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [screenWidth, setScreenWidth] = useState(0)
  const [displayId, setDisplayId] = useState('')
  let history = useHistory()
  const curPath = history.location.pathname
  const curParameters = history.location.search

  // useUpdateUrlParameter('q', inputValue)

  const sendQuery = (query: string | undefined, category: IProductType):void => {
    setLoading(true)
    console.log("env", process.env.REACT_APP_API_URL || "https://kbpartpicker-api-dev.herokuapp.com")
    console.log("ATTEMPTING TO CALL BACKEND")
    axios.get(
      `${process.env.REACT_APP_API_URL || "https://kbpartpicker-api-dev.herokuapp.com"}/categories/${category}/search`,
      {
        params: {query: query}
      }
    )
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
      const pathRegexDisplay = /disp=([^&]+)/
      if (pathRegexDisplay.test(history.location.search)) {
        const selectedProductID = history.location.search.match(/disp=([^&]+)/)
        console.log('displayID', selectedProductID![1])
        setDisplayId(selectedProductID![1])
      }
    })
    .catch(error => {
      if (error.response) {
        setLoading(false)
        const logDetails = {
          "error message": error.response.data.message,
          "http status": error.response.status,
          "http error": error.response.statusText
        }
        console.dir('there was an error returning query results from backend: \n', logDetails)
      } else {
        setLoading(false)
        console.log('there was an error making a request to the backend: \n', error)
      }
    })
  }

  const handleSearchRequest = (e:React.FormEvent):void => {
    e.preventDefault()
    if (inputValue) {
      setNoResults(false)
      sendQuery(inputValue, category)
      history.push(handleParameterUpdate(history.location.search, 'q', inputValue))
    }
  } 

  const focusInput = () => {
    if(document.querySelector('.TerminalInput__inputEl')) {
      //@ts-ignore
      const searchInput:HTMLInputElement = document.querySelector('.TerminalInput__inputEl')
      setTimeout(() => searchInput.focus(), 1)
    }
  }

  useEffect(() => {
    console.log('HISTORY', curPath)
    const pathRegexSearch = /\?.*q=([^&]+)/
    console.log('PATH REGEX', pathRegexSearch)
    console.log(pathRegexSearch.test(curPath))
    if(pathRegexSearch.test(curParameters)) {
      const queryValue = curParameters.match(pathRegexSearch)
      console.log('QUERY VALUE', queryValue)
      if(queryValue![1]) {
        sendQuery(queryValue![1].replace(/%20/, ' '), category)
      }
    }
  }, [category, curParameters])

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'i') {
        window.scroll(0,0)
        focusInput()
      }
    })
    window.addEventListener('resize', (event) => setScreenWidth(window.innerWidth))
    setScreenWidth(window.innerWidth)
  }, [])

  return (
    <div className="Search">
      {bar && (
        <form className="Search__form" onSubmit={(e) => handleSearchRequest(e)}>
        <div className="Search__form-inner">
          <TerminalInput 
            passValue={(value:string) => setInputValue(value)} 
            placeholder={`search for ${category}`}
            type="text"
            focus={true}
          />
          <button className="Search__form__search-button" onSubmit={(e) => handleSearchRequest(e)}>search</button>
        </div>
      </form>
      )}
      {loading ? <div>searching...</div> : null}
      {noResults ? <div>we found no results</div> : null}
      {resultDisplay ? <Results results={searchResults} defaultDisplayId={displayId} addItem={addItem}/> : null}
      {screenWidth <= 600 ? <JumpTo action={focusInput}/> : <div className="Search__hint"><span className="--highlight">i</span> to focus search</div>}
    </div>
  )
}

export default Search