import React from 'react'
import ProductListItem from './ProductListItem'
import { IProductData } from '../types/types'
import './SelectedItems.css'

interface SelectedItemsPorps {
  ids: string[]
  remove: (productData:IProductData) => void
  selectedCases:IProductData[]
  selectedPcb:IProductData[]
  selectedPlates:IProductData[]
  selectedStabilizers:IProductData[]
  selectedSwitches:IProductData[]
  selectedKeycaps:IProductData[]
}

const SelectedItems = ({ids, remove, selectedCases, selectedPcb, selectedPlates, selectedStabilizers, selectedSwitches, selectedKeycaps}:SelectedItemsPorps) => {
  return (
      <div className="Selected-Items">
        {selectedSwitches.length > 0 && (
          selectedSwitches.map(switchData => (
            <div className="Selected-items__switch">
              <div className="Selected-items__switch-item">
                <ProductListItem
                  id={switchData.id}
                  name={switchData.name}
                  imgURL={switchData.img_url}
                  stock={true}
                  price={6}
                />
                <button className="remove" onClick={() => remove(switchData)}>x</button>
              </div>
            </div>
          ))
        )}
      </div>
  )
}

export default SelectedItems
