import React from 'react'
import { useState, useEffect } from 'react'
import checkIfImageLoads from '../utils/checkIfImageLoads'
import useValidImage from '../hooks/useValidImage'
import PriceStock from './PriceStock'
import './ListItem.css'

interface ListItemProps {
    id: number 
    name: string
    imgURL: string
    stock: boolean
    price: number
    displayProduct?: () => void
}

const ListItem = ({ id, name, imgURL, stock, price, displayProduct }:ListItemProps) => {

 const { validImage } = useValidImage(imgURL)
  
  return displayProduct ? (
    <div className={`List-item --link ${!stock ? '--out-of-stock': ''}`} onClick={() => displayProduct()}>
    <div className="List-item-left">
      {validImage ? <img className="List-item-img" src={imgURL} alt={name}/> : <div className="List-item-img-placeholder"></div>}
    </div>
    <div className="List-item-right">
      {displayProduct ? (
      <h3 className="List-item-name --link" onClick={() => displayProduct()}>{name}</h3>
      ) : (
      <h3 className="List-item-name">{name}</h3>
      )}
      <PriceStock price={price} stock={stock}/>
    </div>
  </div>
  ) : (
    <div className="List-item">
    <div className="List-item-left">
    {validImage ? <img className="List-item-img" src={imgURL} alt={name}/> : <div className="List-item-img-placeholder"></div>}
    </div>
    <div className="List-item-right">
      <h3 className="List-item-name">{name}</h3>
      <PriceStock price={price} stock={stock}/>
    </div>
  </div>
  )
}

export default ListItem