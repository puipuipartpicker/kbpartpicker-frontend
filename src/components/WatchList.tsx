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
  addItem: (productId:string) => void
  removeItem: (productData:IProductData) => void
}

const WatchList = ({ addItem, removeItem }:WatchListProps) => {
  const [products, setProducts] = useState([])
  const urlParameters = useHistory().location.search

  const getProductData = async (productIds:string[]) => {
    // query dp
    const productData = await getProductDataByIds(productIds)
    console.log('PRODUCOSIJDLKFJ',productData)
    setProducts(productData.data)

    // axios.get(`${process.env.REACT_APP_API_URL || "https://kbpartpicker-api-dev.herokuapp.com"}/products/${productIds}`)
    // .then(response => console.log(response.data))
  }

  useEffect(() => {
    if (/share=\d+/.test(urlParameters)) {
      const sharedIds = urlParameters.match(/share=(\d+[\d\,]*)/)![1].split(',')
      getProductDataByIds(sharedIds)
        .then(result => setProducts(result.data))
    } else {
      if (localStorage.getItem('selectedItems')) {
        const idsfromStorage = localStorage.getItem('selectedItems')!.split(',')
        getProductDataByIds(idsfromStorage)
        .then(result => setProducts(result.data))
      }
    }
  }, [])

  return (
    <div className="WatchList">
      {products ? (
        <Results results={products} addItem={addItem}/>
        ) : (
        <div>looks like you have no selected items</div>
      )}
    </div>
  )
}

export default WatchList