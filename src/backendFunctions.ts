import axios from 'axios'
import {IProductType} from './types/types'

export const sendQuery = (query: string | undefined, category: IProductType):void => {
  console.log("env", process.env.REACT_APP_API_URL)
  axios.post(`${process.env.REACT_APP_API_URL}/search`, {category: category, query: query})
  .then(response => {
    console.log('got response for query from backends: \n', response)
    console.log('response data: \n', response.data)
    return response
  })
  .catch(error => console.log('there was an error returning query results from backend: \n', error))
}