import React from 'react'
import './ProductListItem.css'

interface ProductListItemProps {
    id: string 
    name: string
    imgURL: string
    stock: boolean
    price: number
    displayProduct?: () => void
}

const ProductListItem = ({id, name, imgURL, stock, price, displayProduct }:ProductListItemProps) => (
  <div className="Results__items-item">
    <img className="Results__items-item-img" src={imgURL} alt={name}/>
    {displayProduct ? (
    <h3 className="Results__items-item-name --link" onClick={() => displayProduct()}>{name}</h3>
    ) : (
    <h3 className="Results__items-item-name">{name}</h3>
    )}
    <div className="Results__items-item-price-stock">
      <div className="Results__items-item-price-stock-price">{price}</div>
      <div className="Results__items-item-price-stock-stock">in stock? {stock ? 'yes!' : 'nope :('}</div>
    </div>
  </div>
)

export default ProductListItem