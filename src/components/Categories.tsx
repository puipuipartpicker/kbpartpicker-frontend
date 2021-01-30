import React from 'react'
import { Link } from 'react-router-dom'
import Paths from '../types/Paths'
import { IProductData } from '../types/types'
import './Categories.css'

interface CategoriesProps {
  removeSelectedItem: (product:IProductData) => void
  selectedCases: IProductData[]
  selectedPcb: IProductData[] 
  selectedPlates: IProductData[]
  selectedStabilizers: IProductData[]
  selectedSwitches: IProductData[] 
  selectedKeycaps: IProductData[] 
}

const Categories = ({removeSelectedItem, selectedCases, selectedPcb, selectedPlates, selectedStabilizers, selectedSwitches, selectedKeycaps}:CategoriesProps) => (
  <div className="Categories">
    <div className="Categories__category">
      <Link className="Categories__category-cases" tabIndex={0} to={Paths.cases}>case</Link>
      {selectedCases.length > 0 ? (
        selectedCases.map((item, i) => (
          <li className="Categories__category__button-cases-selected" key={`case-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}      
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.pcb}>PCB</Link>
      {selectedPcb.length > 0 ? (
        selectedPcb.map((item, i) => (
          <li className="Categories__category__button-pcb-selected" key={`pcb-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.plates}>plate</Link>
      {selectedPlates.length > 0 ? (
        selectedPlates.map((item, i) => (
          <li className="Categories__category__button-plate-selected" key={`plate-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.stabilizers}>stabilizer</Link>
      {selectedStabilizers.length > 0 ? (
        selectedStabilizers.map((item, i) => (
          <li className="Categories__category__button-stabilizer-selected" key={`stabilizer-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.switch}>switch</Link>
      {selectedSwitches.length > 0 ? (
        selectedSwitches.map((item, i) => (
          <li className="Categories__category__button-switch-selected" key={`switch-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.keycaps}>keycaps</Link>
      {selectedKeycaps.length > 0 ? (
        selectedKeycaps.map((item, i) => (
          <li className="Categories__category__button-keycaps-selected" key={`keycaps-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
  </div>
)

export default Categories