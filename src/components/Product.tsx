import React, { useEffect, useState} from 'react'
import axios, { AxiosResponse } from 'axios' 
import './Product.css'
import { IProductType, IProductSize, IProductLayout, IProductData, IVendor } from '../types/types'


interface ProductProps {
  id: string
}

const Product = ({ id }:ProductProps) => {
  const [responce, setReponce] = useState(false)
  const [name, setName] = useState<String>('')
  const [type, setType] = useState('')
  const [size, setSize] = useState('')
  const [layout, setLayout] = useState('')
  const [hotswap, setHotwap] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [vendors, setVendors] = useState<IVendor[]>([])

  const getProductData = (id:string): any => {
    axios.get(`${process.env.REACT_APP_API_URL}/get`, {params: {id:id}})
    .then(response => {
      setReponce(true)
      setName(response.data.name)
      if (response.data.type) {setType(response.data.type)}
      if (response.data.size) {setSize(response.data.size)}
      if (response.data.layout) {setLayout(response.data.layout)}
      if (response.data.hotswap) {setHotwap(response.data.hotswap)}
      setImgURL(response.data.img_url)
      setVendors(response.data.vendors)
    })
    .catch(error => console.log(error))
  }
  
  useEffect(() => {
    getProductData(id)
  }, [id])

  return (
  <div className="Product">
    {responce ? (
      <>
      <img className="Product__img" src={imgURL} alt={`product image of ${name}`}/>
      <h2 className="Product__name">{name}</h2> 
      <div className="Product__vendors">
        {vendors.map((vendor, i) => (
          <div className="Product__vendors-vendor" key={`${vendor}-${i}`}>
            <a href={vendor.product_url} target="_blank"><h3 className="Product__vendors-name">{vendor.name}</h3></a>
            <p>{vendor.price}</p>
            <span className="Product__vendors-status">In stock?{vendor.in_stock ? 'yes!' : 'nope'}</span>
          </div>
        ))}
      </div>
      </>
    ) : (
      <div>loading</div>
    )}
  </div>
)}

export default Product