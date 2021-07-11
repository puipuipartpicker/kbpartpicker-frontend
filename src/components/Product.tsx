import React, { useEffect, useState} from 'react'
import axios from 'axios' 
// import { AxiosResponse } from 'axios' 
import './Product.css'
// import { IProductType, IProductSize, IProductLayout, IProductData } from '../types/types'
import { IVendor } from '../types/types'
import { getProductDataByIds } from '../backendFunctions'


interface ProductProps {
  id: string
  addItem: (selectedProduct: string) => void
}

const Product = ({ id, addItem }:ProductProps) => {
  const [responce, setReponce] = useState(false)
  const [name, setName] = useState<String>('')
  const [type, setType] = useState('')
  const [size, setSize] = useState('')
  const [layout, setLayout] = useState('')
  const [hotswap, setHotwap] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [vendors, setVendors] = useState<IVendor[]>([])

  // const getProductData = (id:string): any => {
  //   axios.get(`${process.env.REACT_APP_API_URL || "https://kbpartpicker-api-dev.herokuapp.com"}/products/${id}`)
  //   .then(response => {
  //     setReponce(true)
  //     setName(response.data.name)
  //     if (response.data.type) {setType(response.data.type)}
  //     if (response.data.size) {setSize(response.data.size)}
  //     if (response.data.layout) {setLayout(response.data.layout)}
  //     if (response.data.hotswap) {setHotwap(response.data.hotswap)}
  //     setImgURL(response.data.img_url)
  //     setVendors(response.data.vendors)
  //   })
  //   .catch(error => {
  //     if (error.response) {
  //       const logDetails = {
  //         "error message": error.response.data.message,
  //         "http status": error.response.status,
  //         "http error": error.response.statusText
  //       }
  //       console.dir('there was an error returning query results from backend: \n', logDetails)
  //     } else {
  //       console.log('there was an error making a request to the backend: \n', error)
  //     }
  //   })
  // }
  
  useEffect(() => {
    // getProductData(id)
    getProductDataByIds([id]).then(response => {
      const productData = response.data[0]
      setReponce(true)
      setName(productData.name)
      if (productData.type) {setType(productData.type)}
      if (productData.size) {setSize(productData.size)}
      if (productData.layout) {setLayout(productData.layout)}
      if (productData.hotswap) {setHotwap(productData.hotswap)}
      setImgURL(productData.img_url)
      setVendors(productData.vendors)
    }).catch(error => {
      if (error.response) {
        const logDetails = {
          "error message": error.response.data.message,
          "http status": error.response.status,
          "http error": error.response.statusText
        }
        console.dir('there was an error returning query results from backend: \n', logDetails)
      } else {
        console.log('there was an error making a request to the backend: \n', error)
      }
    })
  }, [id])

  return (
  <div className="Product">
    {responce ? (
      <>
      <div className="Product__img-name-container">
        <div className="Product__img-container">
          <img className="Product__img" src={imgURL} alt={`${name}`}/>
        </div>
        <div className="Product__name-container">
          <h2 className="Product__name">{name}</h2> 
        </div> 
      </div>
      <div className="Product__vendors-container">
        <div className="Product__vendors">
          {vendors.map((vendor, i) => (
            <div className="Product__vendors-vendor" key={`${vendor}-${i}`}>
              <a href={vendor.url} target="_blank" rel="noopener noreferrer">
                <h3 className="Product__vendors-name">{vendor.name}</h3>
              </a>
              <p>{vendor.price}</p>
              {type ? <p>{type}</p> : null} 
              {size ? <p>{size}</p> : null}
              {layout ? <p>{layout}</p> : null}
              {hotswap ? <p>{hotswap}</p> : null}
              <span className="Product__vendors-status">In stock?{vendor.in_stock ? 'yes!' : 'nope'}</span>
            </div>
          ))}
        </div>
      </div>
      </>
    ) : (
      <div>loading...</div>
    )}
  </div>
)}

export default Product