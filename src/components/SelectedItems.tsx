import React, { useEffect } from 'react'
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
  
  useEffect(() => {

  }, [])

  return (
      <div className="Selected-Items">
        
        {selectedCases.length > 0 && (
          selectedCases.map((caseData, i) => (
            <div className="Selected-items__case" key={`selected-case-${i}`}>
              <h1>Case</h1>
              <div className="Selected-items__item-case">
                <ProductListItem
                  id={caseData.id}
                  name={caseData.name}
                  imgURL={caseData.img_url}
                  stock={true}
                  price={6}
                />
                <button className="Selected-items__remove" onClick={() => remove(caseData)}>x</button>
              </div>
            </div>
          ))
        )}

        {selectedPcb.length > 0 && (
          selectedPcb.map((pdbData, i) => (
            <div className="Selected-items__pcb" key={`selected-pcb-${i}`}>
              <div className="Selected-items__item-pcb">
                <ProductListItem
                  id={pdbData.id}
                  name={pdbData.name}
                  imgURL={pdbData.img_url}
                  stock={true}
                  price={6}
                />
                <button className="Selected-items__remove" onClick={() => remove(pdbData)}>x</button>
              </div>
            </div>
          ))
        )}

        {selectedPlates.length > 0 && (
          selectedPlates.map((plateData, i) => (
            <div className="Selected-items__plate" key={`selected-plate-${i}`}>
              <div className="Selected-items__item-pcb">
                <ProductListItem
                  id={plateData.id}
                  name={plateData.name}
                  imgURL={plateData.img_url}
                  stock={true}
                  price={6}
                />
                <button className="Selected-items__remove" onClick={() => remove(plateData)}>x</button>
              </div>
            </div>
          ))
        )}

        {selectedStabilizers.length > 0 && (
          selectedStabilizers.map((stabData, i) => (
            <div className="Selected-items__stab" key={`selected-stab-${i}`}>
              <div className="Selected-items__item-stab">
                <ProductListItem
                  id={stabData.id}
                  name={stabData.name}
                  imgURL={stabData.img_url}
                  stock={true}
                  price={6}
                />
                <button className="Selected-items__remove" onClick={() => remove(stabData)}>x</button>
              </div>
            </div>
          ))
        )}

        {selectedSwitches.length > 0 && (
          selectedSwitches.map((switchData, i) => (
            <div className="Selected-items__switch" key={`selected-switch-${i}`}>
              <h2>switches:</h2>
              <div className="Selected-items__item-switch">
                <ProductListItem
                  id={switchData.id}
                  name={switchData.name}
                  imgURL={switchData.img_url}
                  stock={true}
                  price={6}
                />
                <button className="Selected-items__remove" onClick={() => remove(switchData)}>x</button>
              </div>
            </div>
          ))
        )}

        {selectedKeycaps.length > 0 && (
          selectedKeycaps.map((keycapData, i) => (
            <div className="Selected-items__keycap" key={`selected-keycap-${i}`}>
              <div className="Selected-items__item-keycap">
                <ProductListItem
                  id={keycapData.id}
                  name={keycapData.name}
                  imgURL={keycapData.img_url}
                  stock={true}
                  price={6}
                />
                <button className="Selected-items__remove" onClick={() => remove(keycapData)}>x</button>
              </div>
            </div>
          ))
        )}

      </div>
  )
}

export default SelectedItems
