import React from 'react'
import useEffect from 'react'
import './Product.css'
import axios from 'axios' 

import { IProductType, IProductSize, IProductLayout, IProductData } from '../types/types'

import { ProductTestData } from '../TestData'
// import { getProductData } from '../dbFunctions'

interface ProductProps {
  id: string
}

const Product = ({ id }:ProductProps) => {

  const getProductData = (id:string): any => {
    axios.get(`${process.env.REACT_APP_API_URL}/get`, {params: {id:id}})
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => console.log(error))
  }
  
  // const {name, type, size, layout, hotswap, imgURL, vendors } = getProductData(id)
  // const {name, imgURL, vendors } = getProductData(id)
  // console.log(name, vendors)
  // useEffect(() => {
  //   getProductData()
  // }, [])

  getProductData(id)


  return (
  <div className="Product">
    {/* <img className="Product__img" src={imgURL} alt={`product image of ${name}`}/>
    <h2 className="Product__name">{name}</h2> */}
    {/* <div className="Product__vendors">
      {vendors.map((vendor, i) => (
        <div className="Product__vendors-vendor" key={`${vendor}-${i}`}>
          <a href={vendor.productURL} target="_blank"><h3 className="Product__vendors-name">{vendor.name}</h3></a>
          <p>{vendor.price}</p>
          <span className="Product__vendors-status">In stock?{vendor.inStock ? 'yes!' : 'nope'}</span>
        </div> */}
      {/* ))} */}
    {/* </div> */}
  </div>
)}

export default Product