import React, { useContext } from 'react'
import { WatchListContext } from '../WatchListContext'
import ProductListItem from './ProductListItem'
import { IProductData } from '../types/types'
import CopyToClipboard from './CopyToClipboard'
import './SelectedItems.css'

interface SelectedItemsPorps {
  ids: string[]
  selectedCases:IProductData[]
  selectedPcb:IProductData[]
  selectedPlates:IProductData[]
  selectedStabilizers:IProductData[]
  selectedSwitches:IProductData[]
  selectedKeycaps:IProductData[]
}

const SelectedItems = ({ids, selectedCases, selectedPcb, selectedPlates, selectedStabilizers, selectedSwitches, selectedKeycaps}:SelectedItemsPorps) => {
  
  const { allWatchListIds,removeItem } = useContext(WatchListContext)

  return (
      <div className="Selected-Items">
        <div className="Selected-items__container-case">
          {selectedCases.length > 0 && (
            <h2 className="Selected-items__header-case">Cases:</h2>
          )}
          {selectedCases.length > 0 && (
            selectedCases.map((caseData, i) => (
              <div className="Selected-items__case" key={`selected-case-${i}`}>
                <div className="Selected-items__item-case">
                  <ProductListItem
                    id={caseData.id}
                    name={caseData.name}
                    imgURL={caseData.img_url}
                    stock={true}
                    price={6}
                  />
                  <button className="Selected-items__remove" onClick={() => removeItem(caseData)}>x</button>
                </div>
              </div>
            ))
          )}
        </div>  
        
        <div className="Selected-items__container-pcb">
          {selectedPcb.length > 0 && (
            <h2 className="Selected-items__header-pcb">PCBs:</h2>
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
                  <button className="Selected-items__remove" onClick={() => removeItem(pdbData)}>x</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="Selected-items__container-plate">
          {selectedPlates.length > 0 && (
            <h2 className="Selected-items__header-plate">plate:</h2>
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
                  <button className="Selected-items__remove" onClick={() => removeItem(plateData)}>x</button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="Selected-items__container-stabilizers">
          {selectedStabilizers.length > 0 && (
            <h2 className="Selected-items__header-stabilizers">stabilizers:</h2>
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
                  <button className="Selected-items__remove" onClick={() => removeItem(stabData)}>x</button>
                </div>
              </div>
            ))
          )}
        </div>
            
        <div className="Selected-items__container-switch">
          {selectedSwitches.length > 0 && (
            <h2 className="Selected-items__header-switch">switches:</h2>
          )}
          {selectedSwitches.length > 0 && (
            selectedSwitches.map((switchData, i) => (
              <div className="Selected-items__switch" key={`selected-switch-${i}`}>
                <div className="Selected-items__item-switch">
                  <ProductListItem
                    id={switchData.id}
                    name={switchData.name}
                    imgURL={switchData.img_url}
                    stock={true}
                    price={6}
                  />
                  <button className="Selected-items__remove" onClick={() => removeItem(switchData)}>x</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="Selected-items__container-switch">
          {selectedKeycaps.length > 0 && (
            <h2 className="Selected-items__switch-keycaps">keycaps:</h2>
          )}
          {selectedKeycaps.length > 0 && (
            selectedKeycaps.map((keycapData, i) => (
              <div className="Selected-items__header-keycap" key={`selected-keycap-${i}`}>
                <div className="Selected-items__item-keycap">
                  <ProductListItem
                    id={keycapData.id}
                    name={keycapData.name}
                    imgURL={keycapData.img_url}
                    stock={true}
                    price={6}
                  />
                  <button className="Selected-items__remove" onClick={() => removeItem(keycapData)}>x</button>
                </div>
              </div>
            ))
          )}
        </div>

      {allWatchListIds.length > 0 && (
        <CopyToClipboard 
        buttonText="sharable link" 
        stringToCopy={`${process.env.REACT_APP_URL || 'http://localhost:3000'}/test?share=${ids}`}
        />
      )}
      </div>
  )
}

export default SelectedItems
