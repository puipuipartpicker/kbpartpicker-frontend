import React, { useEffect, useState, useContext} from 'react'
import './Product.css'
import { IVendor } from '../types/types'
import { getProductDataByIds } from '../utils/backendFunctions'
import checkIfImageLoads from '../utils/checkIfImageLoads'
import { WatchListContext } from '../context/WatchListContext'
import { MessageContext } from '../context/MessageContext'
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
  const [validImg, setValidImg] = useState(false)
  const [vendors, setVendors] = useState<IVendor[]>([])

  const { addItem, allWatchListIds } = useContext(WatchListContext)
  const { setDisplayMessage, setMessageText } = useContext(MessageContext)
  
  useEffect(() => {
    getProductDataByIds([`${id}`]).then(response => {
      const productData = response.data[0]
      
      setTimeout(() => setResponse(true), 1000)

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

  useEffect(() => {
    if (imgURL) {
      checkIfImageLoads(imgURL).then(resp => {
        // resp ? setTimeout(() => setValidImg(true), 1000) : setValidImg(false)
        setValidImg(resp)
      })
    }
    if (/300x300/.test(imgURL)) {
      checkIfImageLoads(imgURL.replace(/300x300/, '600x600')).then(resp => {
        if (resp) {
          setImgURL(prevUrl => prevUrl.replace(/300x300/, '600x600'))
          // setTimeout(() => setValidImg(true), 1000)
          setValidImg(true)
        }
      })
    }
  }, [imgURL])

  return (
  <div className="Product">
    {responce ? (
      <>
      <div className="Product__img-name-container">
        <div className="Product__img-container">
        {validImg ? 
          <img className="Product__img" src={imgURL} alt={`${name}`}/> : 
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