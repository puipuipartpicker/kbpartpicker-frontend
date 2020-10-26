import React from 'react'
import './Product.css'

import { IProductType, IProductSize, IProductLayout, IProductData } from '../types/types'

// import { ProductTestData } from '../TestData'


interface IAllProductData {
  [id: number]: {
    name: string 
    type: IProductType
    size?: IProductSize
    layout?: IProductLayout
    hotswap?: boolean
    imgURL: string
    vendors: {
      id: number
      name: string
      logoURL?: string
      vendorURL: string
      productURL: string
      inStock: boolean
      price: string
    }[]
  }
}

let ProductTestData:IAllProductData = {}

ProductTestData = {
  123: {
    name: 'test name',
    type: 'case',
    layout: '60',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1024x1024@2x.png?v=1601649358',
    vendors: [{
      id: 12345,
      name: 'NovelKeys_',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://novelkeys.xyz/',
      productURL: 'https://novelkeys.xyz/collections/frontpage/products/gmk-space-cadet-ii-gb',
      inStock: true,
      price: '$120'
    }, {
      id: 6666,
      name: 'KBDfans',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://kbdfans.com/',
      productURL: 'https://kbdfans.com/collections/keycaps/products/gb-epbt-skadi-1',
      inStock: true,
      price: '$92'
    }, {
      id: 2121,
      name: 'PIMP MY KEYBOARD',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://pimpmykeyboard.com/',
      productURL: 'https://cdn10.bigcommerce.com/s-ktpi93fl/products/215/images/2068/GRANITE__46110.1571872160.1280.1280.jpg?c=2',
      inStock: true,
      price: '$79'
    },{
      id: 6666,
      name: 'KBDfans',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://kbdfans.com/',
      productURL: 'https://kbdfans.com/collections/keycaps/products/gb-epbt-skadi-1',
      inStock: true,
      price: '$92'
    }, {
      id: 2121,
      name: 'PIMP MY KEYBOARD',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://pimpmykeyboard.com/',
      productURL: 'https://cdn10.bigcommerce.com/s-ktpi93fl/products/215/images/2068/GRANITE__46110.1571872160.1280.1280.jpg?c=2',
      inStock: true,
      price: '$79'
    }]
  } ,   
  666: {
    name: 'test name2',
    type: 'pcb',
    layout: '60',
    hotswap: true,
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    vendors: [{
      id: 12345,
      name: 'NovelKeys_',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://novelkeys.xyz/',
      productURL: 'https://novelkeys.xyz/collections/diy-kits/products/nk65-pcb',
      inStock: true,
      price: '$50'
    }, {
      id: 6666,
      name: 'KBDfans',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://kbdfans.com/',
      productURL: 'https://kbdfans.com/collections/65/products/dz68rgb-hot-swap-rgb-pcb',
      inStock: false,
      price: '$58'
    }]
  }
}

const getProductData = (id: number): IProductData => {
  return ProductTestData[id]
}

interface ProductProps {
  id: string
}

const Product = ({ id }:ProductProps) => {
  const {name, type, size, layout, hotswap, imgURL, vendors } = getProductData(+id)
  console.log('ProductTestData', ProductTestData[+id])

  return (
  <div className="Product">
    <img className="Product__img" src={imgURL} alt={`product image of ${name}`}/>
    <h2 className="Product__name">{name}</h2>
    <div className="Product__vendors">
      {vendors.map(vendor => (
        <div className="Product__vendors-vendor">
          <a href={vendor.productURL} target="_blank"><h3 className="Product__vendors-name">{vendor.name}</h3></a>
          <p>{vendor.price}</p>
          <span className="Product__vendors-status">In stock?{vendor.inStock ? 'yes!' : 'nope'}</span>
        </div>
      ))}
    </div>
  </div>
)}

export default Product