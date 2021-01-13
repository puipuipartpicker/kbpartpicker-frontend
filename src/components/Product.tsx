import React, { useEffect, useState} from 'react'
import axios from 'axios' 
// import { AxiosResponse } from 'axios' 
import './Product.css'
// import { IProductType, IProductSize, IProductLayout, IProductData } from '../types/types'
import { IVendor } from '../types/types'


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
      <button className="Results__product-add-select" onClick={() => addItem(id)}>add to selected items</button>
      <img className="Product__img" src={imgURL} alt={`${name}`}/>
      <h2 className="Product__name">{name}</h2> 
      <div className="Product__vendors">
        {vendors.map((vendor, i) => (
          <div className="Product__vendors-vendor" key={`${vendor}-${i}`}>
            <a href={vendor.product_url} target="_blank" rel="noopener noreferrer">
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
      </>
    ) : (
      <div>loading...</div>
    )}
  </div>
)}

export default Product