import React from 'react'
import './Product.css'

import { IProductType, IProductSize, IProductLayout, IProductData } from '../types/types'

import { ProductTestData } from '../TestData'
import { getProductData } from '../dbFunctions'

interface ProductProps {
  id: number
}

const Product = ({ id }:ProductProps) => {
  
  const {name, type, size, layout, hotswap, imgURL, vendors } = getProductData(id)

  return (
  <div className="Product">
    <img className="Product__img" src={imgURL} alt={`product image of ${name}`}/>
    <h2 className="Product__name">{name}</h2>
    <div className="Product__vendors">
      {vendors.map((vendor, i) => (
        <div className="Product__vendors-vendor" key={`${vendor}-${i}`}>
          <a href={vendor.productURL} target="_blank"><h3 className="Product__vendors-name">{vendor.name}</h3></a>
          <p>{vendor.price}</p>
          <span className="Product__vendors-status">In stock?{vendor.inStock ? 'yes!' : 'nope'}</span>
        </div>
      ))}
    </div>
  </div>
)}

export default Product