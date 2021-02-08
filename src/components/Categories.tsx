import React, { useState } from 'react'
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

const Categories = ({removeSelectedItem, selectedCases, selectedPcb, selectedPlates, selectedStabilizers, selectedSwitches, selectedKeycaps}:CategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState('')
  const [displaySelectedCase, setDisplaySelectedCase] = useState(false)
  const [displaySelectedPCB, setDisplaySelectedPCB] = useState(false)
  const [displaySelectedPlate, setDisplaySelectedPlate] = useState(false)
  const [displaySelectedStab, setDisplaySelectedStab] = useState(false)
  const [displaySelectedSwitch, setDisplaySelectedSwitch] = useState(false)
  const [displaySelectedKeycaps, setDisplaySelectedKeycaps] = useState(false)
  
  return (
  <div className="Categories">
    <div className="Categories__category">
      <Link 
        className={`Categories__category-cases${activeCategory === 'case' ? " --active" : null}`}
        tabIndex={0} 
        to={Paths.cases} 
        onClick={() => setActiveCategory('case')}>
        case
      </Link>
      {selectedCases.length > 0 ? (
        <div className="Categories__category__button-selected-number-cases">{selectedCases.length}</div>
      ) : null}
      {selectedCases.length > 0 ? (
        selectedCases.map((item, i) => (
          <li className="Categories__category__button-selected-cases" key={`case-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}      
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-pcbs${activeCategory === 'pcb' ? " --active" : null}`}
        tabIndex={0} 
        to={Paths.pcb}
        onClick={() => setActiveCategory('pcb')}>
        PCB
      </Link>
      {selectedPcb.length > 0 ? (
        selectedPcb.map((item, i) => (
          <li className="Categories__category__button-selected-pcb" key={`pcb-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-plates${activeCategory === 'plate' ? " --active" : null}`}
        tabIndex={0} 
        to={Paths.plates}
        onClick={() => setActiveCategory('plate')}>
        plate
      </Link>
      {selectedPlates.length > 0 ? (
        selectedPlates.map((item, i) => (
          <li className="Categories__category__button-selected-plate" key={`plate-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-stabilizers${activeCategory === 'stabilizer' ? " --active" : null}`}
        tabIndex={0} 
        to={Paths.stabilizers}
        onClick={() => setActiveCategory('stabilizer')}>
        stabilizer
      </Link>
      {selectedStabilizers.length > 0 ? (
        selectedStabilizers.map((item, i) => (
          <li className="Categories__category__button-selected-stabilizer" key={`stabilizer-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-switches${activeCategory === 'switch' ? " --active" : null}`}
        tabIndex={0} 
        to={Paths.switch}
        onClick={() => setActiveCategory('switch')}>
        switch
      </Link>
      {selectedSwitches.length > 0 ? (
        selectedSwitches.map((item, i) => (
          <li className="Categories__category__button-selected-switch" key={`switch-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-keycapss${activeCategory === 'keycaps' ? " --active" : null}`}
        tabIndex={0} 
        to={Paths.keycaps}
        onClick={() => setActiveCategory('keycaps')}>
        keycaps
      </Link>
      {selectedKeycaps.length > 0 ? (
        selectedKeycaps.map((item, i) => (
          <li className="Categories__category__button-selected-keycaps" key={`keycaps-${i}`}>
            {item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span>
          </li>
        ))
      ) : null}
    </div>
  </div>
)}

export default Categories