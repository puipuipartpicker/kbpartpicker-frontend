import React from "react";
import { ReactComponent as ShoppingCart } from '../svg/icon-shopping-cart.svg'
import { ReactComponent as Archive } from '../svg/icon-archive.svg'
import './PriceStock.css'

interface PriceStockProps {
  price?: number
  stock: boolean | null
}

const PriceStock = ({ price, stock }:PriceStockProps) => {
  const stockSvg = stock ? ShoppingCart : Archive
  let message = ''
  if (stock === null) { message = 'we\'re not sure' }
  if (stock === false) { message = 'out of stock' } 
  if (stock === true) { message = 'in stock!' }
  return (
    <div className="PriceStock">
      {price && <div className="PriceStock-price">${price}</div>}
      <div className="PriceStock-stock-icon">{stockSvg}</div>
      <div className="PriceStock-stock-message">{message}</div>
    </div>
  )
}

export default PriceStock