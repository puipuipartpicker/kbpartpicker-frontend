import React, { useEffect, useState, useContext} from 'react'
import './Product.css'
import { IVendor } from '../types/types'
import { getProductDataByIds } from '../utils/backendFunctions'
import useValidImage from '../hooks/useValidImage'
import { WatchListContext } from '../context/WatchListContext'
// import { MessageContext } from '../context/MessageContext'
import useMessage from '../hooks/useMessage'
import { ReactComponent as AddCircle } from '../assets/svg/icon-add-circle.svg'
import ProductPlaceHolder from './ProductPlaceHolder'
import PriceStock from './PriceStock'
import { directive } from '@babel/types'


interface ProductProps {
  id: number
}

const Product = ({ id }:ProductProps) => {
  const [responce, setResponse] = useState(false)
  const [name, setName] = useState<String>('')
  const [type, setType] = useState('')
  const [size, setSize] = useState('')
  const [layout, setLayout] = useState('')
  const [hotswap, setHotwap] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [vendors, setVendors] = useState<IVendor[]>([])

  const { validImage, returnUrl } = useValidImage(imgURL, /300x300/, '600x600')

  const { addItem, allWatchListIds } = useContext(WatchListContext)
  // const { setDisplayMessage, setMessageText } = useContext(MessageContext)
  const { setDisplayMessage, setMessageText } = useMessage()
  
  useEffect(() => {
    setResponse(false)
    getProductDataByIds([`${id}`]).then(response => {
      const productData = response.data[0]
      
      setTimeout(() => setResponse(true), 500)

      setName(productData.name)
      if (productData.type) { setType(productData.type) }
      if (productData.size) { setSize(productData.size) }
      if (productData.layout) { setLayout(productData.layout) }
      if (productData.hotswap) { setHotwap(productData.hotswap) }
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
        {validImage ? 
          <img className="Product__img" src={returnUrl} alt={`${name}`}/> : 
          <div className="Product__img-placeholder"></div>
        }
        </div>
        <div className="Product__name-container">
          <h2 className="Product__name">{name}</h2> 
        </div> 
      </div>
      <div className="Product__vendors-container">
        <div className="Product__vendors">
          {type ? <p>{type}</p> : null} 
          {size ? <p>{size}</p> : null}
          {layout ? <p>{layout}</p> : null}
          {hotswap ? <p>hotswap</p> : null}
          {vendors.map((vendor, i) => (
            <div className="Product__vendors-vendor" key={`${vendor}-${i}`}>
              <a href={vendor.url} target="_blank" rel="noopener noreferrer">
                <h3 className="Product__vendors-name">{vendor.name}</h3>
              </a>
              <PriceStock price={vendor.price} stock={vendor.in_stock}/>
            </div>
          ))}
        </div>
        <button className="Product__add-to-watch-list" onClick={() => {
          if(!allWatchListIds.includes(`${id}`)) {
            addItem(id)
            setMessageText(`${name} added to your watch list`)
            setDisplayMessage(true)
          } else {
            setMessageText('already on your watch list')
            setDisplayMessage(true)
          }
          }}>
          <AddCircle className="--inverse"/>
          add to watch list
        </button>
      </div>
      </>
    ) : (
      <ProductPlaceHolder />
    )}
  </div>
)}

export default Product