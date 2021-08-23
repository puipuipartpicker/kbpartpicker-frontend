import React from "react";
import { ReactComponent as ShoppingCart } from '../svg/icon-shopping-cart.svg'
import { ReactComponent as Archive } from '../svg/icon-archive.svg'
import './PriceStock.css'

interface PriceStockProps {
  price: number
  stock: boolean
}

const PriceStock = ({price, stock}:PriceStockProps) => {
  const stockSvg = stock ? <ShoppingCart /> : <Archive />
  return (
    <div className="PriceStock">
      {price && <div className="PriceStock-price">${price}</div>}
      <div className="PriceStock-stock-icon">{stockSvg}</div>
      <div className="PriceStock-stock-message">{stock ? 'in stock!' : 'out of stock'}</div>
    </div>
  )
}

export default PriceStock