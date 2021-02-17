import axios from 'axios'
import {IProductType} from './types/types'

export const sendQuery = (query: string | undefined, category: IProductType):void => {
  console.log("env", process.env.REACT_APP_API_URL)
  axios.get(`${process.env.REACT_APP_API_URL}/categories/${category}/search`, { params: { query: query }})
  .then(response => {
    console.log('got response for query from backends: \n', response)
    console.log('response data: \n', response.data)
    return response
  })
  .catch(error => {
    if (error.response) {
      const logDetails = {
        "error message": error.response.data.message,
        "http status": error.response.status,
        "http error": error.response.statusText
      }
      console.dir('there was an error returning query results from backend: \n', logDetails)
    } else {
      console.log('there was an error making a request to the backend: \n', error)
    }
  })
}
