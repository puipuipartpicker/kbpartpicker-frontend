import React from 'react'
import './ListItem.css'
import PriceStock from './PriceStock'

interface ListItemProps {
    id: number 
    name: string
    imgURL: string
    stock: boolean
    price: number
    displayProduct?: () => void
}

const ListItem = ({ id, name, imgURL, stock, price, displayProduct }:ListItemProps) => {
  
  return displayProduct ? (
    <div className={`List-item --link ${!stock ? '--out-of-stock': ''}`} onClick={() => displayProduct()}>
    <div className="List-item-left">
      <img className="List-item-img" src={imgURL} alt={name}/>
    </div>
    <div className="List-item-right">
      {displayProduct ? (
      <h3 className="List-item-name --link" onClick={() => displayProduct()}>{name}</h3>
      ) : (
      <h3 className="List-item-name">{name}</h3>
      )}
      
    </div>
  </div>
  ) : (
    <div className="List-item">
    <div className="List-item-left">
      <img className="List-item-img" src={imgURL} alt={name}/>
    </div>
    <div className="List-item-right">
      <h3 className="List-item-name">{name}</h3>
      
    </div>
  </div>
  )
}

export default ListItem