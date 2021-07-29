import React from 'react'
import './ListItem.css'
import { ReactComponent as ShoppingCart } from '../svg/icon-shopping-cart.svg'
import { ReactComponent as Archive } from '../svg/icon-archive.svg'

interface ListItemProps {
    id: number 
    name: string
    imgURL: string
    stock: boolean
    price: number
    displayProduct?: () => void
}

const ListItem = ({ id, name, imgURL, stock, price, displayProduct }:ListItemProps) => {
  const stockSvg = stock ? <ShoppingCart /> : <Archive />
  
  return displayProduct ? (
    <div className={`List-item --link ${!stock ? '--out-of-stock': ''}`} onClick={() => displayProduct()}>
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
        <div className="List-item-price-stock-stock">{stock ? 'in stock!' : 'out of stock'}</div>
        <div className="List-item-price-stock-stock-icon">{stockSvg}</div>
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
        <div className="List-item-price-stock-stock">{stock ? 'in stock!' : 'out of stock'}</div>
        <div className="List-item-price-stock-stock-icon">{stockSvg}</div>
      </div>
    </div>
  </div>
  )
}

export default ListItem