import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import './WatchList.css'
import Results from './Results'
import { IProductData } from '../types/types'
import { getProductDataByIds } from '../backendFunctions'

interface WatchListProps {
  allSelectedIds: string[]
  removeItem: (productData:IProductData) => void
}

const WatchList = ({ allSelectedIds, removeItem }:WatchListProps) => {
  const [products, setProducts] = useState([])
  const urlParameters = useHistory().location.search

  useEffect(() => {
    if (/share=(\d+[\d\,]*)/.test(urlParameters)) {
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
      {products.length > 0 ? (
      <Results results={products}/>
      ) : (
      <div>looks like you have no items on your watch list</div>
      )}
    </div>
  )
}

export default WatchList