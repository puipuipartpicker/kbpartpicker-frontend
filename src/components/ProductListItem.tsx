import React from 'react'
import './ProductListItem.css'

interface ProductListItemProps {
    id: number
    name: string
    imgURL: string
    stock: boolean
    price: number
}

const ProductListItem = ({id, name, imgURL, stock, price }:ProductListItemProps) => (
  <div className="Results__items-item">
    <img className="Results__items-item-img" src={imgURL} alt={`${name} product image`}/>
    <h3 className="Results__items-item-name">{name}</h3>
    <div className="Results__items-item-price-stock">
      <div className="Results__items-item-price-stock-price">{price}</div>
      <div className="Results__items-item-price-stock-stock">in stock? {stock ? 'yes!' : 'nope :('}</div>
    </div>
  </div>
)

export default ProductListItem