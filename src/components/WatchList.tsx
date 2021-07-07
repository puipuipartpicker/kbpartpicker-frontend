import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import './WatchList.css'
import Results from './Results'
import { IProductData } from '../types/types'
import { getProductDataByIds } from '../backendFunctions'

interface WatchListProps {
  storedItemIds: string[]
  addItem: (productId:string) => void
  removeItem: (productData:IProductData) => void
}

const WatchList = ({ storedItemIds, addItem, removeItem }:WatchListProps) => {
  const [products, setProducts] = useState([])
  const urlParameters = useHistory().location.search

  const getProductData = async (productIds:string[]) => {
    // query dp
    // const productData = await getProductDataByIds(productIds)
    // console.log('PRODUCOSIJDLKFJ',productData)
    // setProducts(productData.data)

    axios.get(`${process.env.REACT_APP_API_URL || "https://kbpartpicker-api-dev.herokuapp.com"}/products/${productIds}`)
    .then(response => console.log(response.data))
  }

  useEffect(() => {
    if (/share=\d+/.test(urlParameters)) {
      getProductData(urlParameters.match(/share=\d+[\d\,]*/)![1].split(','))
    } else {
      getProductData(storedItemIds)
    }
  }, [])

  return (
    <div className="WatchList">
      <div>this is the watch list component</div>
      <Results results={products} addItem={addItem}/>
    </div>
  )
}

export default WatchList