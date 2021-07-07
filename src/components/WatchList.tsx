import React from 'react'
import { useState, useEffect } from 'react'
import './WatchList.css'
import Results from './Results'

interface WatchListProps {
  storedItemIds: string[]

  addItem: (productId:string) => void
  removeItem: (productId:string) => void

  urlParameters: string
}

const getProductData = (productIds:string[]) => {
  // query dp
}

const WatchList = ({ storedItemIds, addItem, removeItem, urlParameters }:WatchListProps) => {
  const [products, setProducts] = useState([])
  

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