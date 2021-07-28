import React from 'react'
import './ProductListItem.css'
import { ReactComponent as TrendingUp } from '../svg/icon-trending-up.svg'
import { ReactComponent as TrendingDown } from '../svg/icon-trending-down.svg'

interface ProductListItemProps {
    id: number 
    name: string
    imgURL: string
    stock: boolean
    price: number
    displayProduct?: () => void
}

const ProductListItem = ({ id, name, imgURL, stock, price, displayProduct }:ProductListItemProps) => {
  const stockSvg = stock ? <TrendingUp /> : <TrendingDown />
  
  return displayProduct ? (
    <div className="List-item --link" onClick={() => displayProduct()}>
    <div className="List-item-left">
      <img className="List-item-img" src={imgURL} alt={name}/>
    </div>
    <div className="List-item-right">
      {displayProduct ? (
      <h3 className="List-item-name --link" onClick={() => displayProduct()}>{name}</h3>
      ) : (
      <h3 className="List-item-name">{name}</h3>
      )}
      <div className="List-item-price-stock">
        {price && <div className="List-item-price-stock-price">${price}</div>}
        <div className="List-item-price-stock-stock">{stockSvg}</div>
      </div>
    </div>
  </div>
  ) : (
    <div className="List-item">
    <div className="List-item-left">
      <img className="List-item-img" src={imgURL} alt={name}/>
    </div>
    <div className="List-item-right">
      <h3 className="List-item-name">{name}</h3>
      <div className="List-item-price-stock">
        {price && <div className="List-item-price-stock-price">${price}</div>}
        <div className="List-item-price-stock-stock">{stockSvg}</div>
      </div>
    </div>
  </div>
  )
}

export default ProductListItem