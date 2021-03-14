// get product by id 

import axios from 'axios'

export const getProductByID = (id:string) => {
  axios.get(`${process.env.REACT_APP_API_URL || "https://kbpartpicker-api-dev.herokuapp.com"}/products/${id}`)
}
