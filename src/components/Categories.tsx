import React, { useState, useEffect, useContext } from 'react'
import { WatchListContext } from '../context/WatchListContext'
import { Link } from 'react-router-dom'
import Paths from '../types/Paths'
import { IProductData } from '../types/types'
import { useHistory } from 'react-router-dom'
import './Categories.css'

interface CategoriesProps {
  displayWatch: () => void
  selectedCases: IProductData[]
  selectedPcb: IProductData[] 
  selectedPlates: IProductData[]
  selectedStabilizers: IProductData[]
  selectedSwitches: IProductData[] 
  selectedKeycaps: IProductData[] 
}

const Categories = ({ displayWatch, selectedCases, selectedPcb, selectedPlates, selectedStabilizers, selectedSwitches, selectedKeycaps}:CategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState('')
  const [displaySelectedCase, setDisplaySelectedCase] = useState(false)
  const [displaySelectedPCB, setDisplaySelectedPCB] = useState(false)
  const [displaySelectedPlate, setDisplaySelectedPlate] = useState(false)
  const [displaySelectedStab, setDisplaySelectedStab] = useState(false)
  const [displaySelectedSwitch, setDisplaySelectedSwitch] = useState(false)
  const [displaySelectedKeycaps, setDisplaySelectedKeycaps] = useState(false)

  const curPath = useHistory().location.pathname

  const { removeItem } = useContext(WatchListContext)

  useEffect(() => {
    if (selectedCases.length === 0) { setDisplaySelectedCase(false) }
    if (selectedPcb.length === 0) { setDisplaySelectedPCB(false) }
    if (selectedPlates.length === 0) { setDisplaySelectedPlate(false) }
    if (selectedStabilizers.length === 0) { setDisplaySelectedStab(false) }
    if (selectedSwitches.length === 0) { setDisplaySelectedSwitch(false) }
    if (selectedKeycaps.length === 0) { setDisplaySelectedKeycaps(false) }

  }, [selectedCases, selectedPcb, selectedPlates, selectedStabilizers, selectedSwitches, selectedKeycaps])

  useEffect(() => {
    const catRegex:RegExp = new RegExp('([^/]+)');
    if(catRegex.test(curPath)) {
      setActiveCategory(curPath.match(catRegex)![1])
    }
  },[])
  
  return (
  <div className="Categories">
    <div className="Categories__category">
      <Link 
        className={`Categories__category-cases${activeCategory === 'case' ? " --active" : ''}`}
        tabIndex={0} 
        to={Paths.cases} 
        onClick={() => setActiveCategory('case')}>
        case
      </Link>
      {selectedCases.length > 0 ? (
          <div 
            className={`Categories__category__button-selected-number-case ${displaySelectedCase && '--open'} ${activeCategory === 'case' ? "--active-selected" : ''}`}
            onClick={() => setDisplaySelectedCase((prev => !prev))}>
            {displaySelectedCase ? '>' : selectedCases.length}
          </div>
        ) : null}
      <div className={`Categories__category-selected ${displaySelectedCase ? '--open' : ''} ${activeCategory === 'case' ? "--active-selected" : ''}`}>
        {selectedCases.length > 0 && displaySelectedCase ? (
          selectedCases.map((item, i) => (
            <li className="Categories__category__button-selected-items-case" key={`case-${i}`}>
              {item.name} <span className="--remove" onClick={() => {
                removeItem(item)
                if (selectedCases.length === 0) { setDisplaySelectedCase(false) }
                }}>remove x</span>
            </li>
          ))
        ) : null}
      </div>   
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-pcbs${activeCategory === 'pcb' ? " --active" : ''}`}
        tabIndex={0} 
        to={Paths.pcb}
        onClick={() => setActiveCategory('pcb')}>
        PCB
      </Link>
      {selectedPcb.length > 0 ? (
      <div 
        className={`Categories__category__button-selected-number-pcb ${displaySelectedPCB && '--open'} ${activeCategory === 'pcb' ? "--active-selected" : ''}`}
        onClick={() => setDisplaySelectedPCB((prev => !prev))}>
        {displaySelectedPCB ? '>' : selectedPcb.length}
      </div>
        ) : null}
      <div className={`Categories__category-selected ${displaySelectedPCB ? '--display' : ''} ${activeCategory === 'pcb' ? "--active-selected" : ''}`}>
        {selectedPcb.length > 0 && displaySelectedPCB ? (
          selectedPcb.map((item, i) => (
            <li className="Categories__category__button-selected-items-pcb" key={`pcb-${i}`}>
              {item.name} <span className="--remove" onClick={() => {
                removeItem(item)
                if (selectedPcb.length === 0) { setDisplaySelectedPCB(false) }
                }}>remove x</span>
            </li>
          ))
        ) : null}
      </div>
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-plates${activeCategory === 'plate' ? " --active" : ''}`}
        tabIndex={0} 
        to={Paths.plates}
        onClick={() => setActiveCategory('plate')}>
        plate
      </Link>
      {selectedPlates.length > 0 ? (
          <div 
            className={`Categories__category__button-selected-number-plate ${displaySelectedPlate && '--open'} ${activeCategory === 'plate' ? "--active-selected" : ''}`}
            onClick={() => setDisplaySelectedPlate((prev => !prev))}>
            {displaySelectedPlate ? '>' : selectedPlates.length}
          </div>
        ) : null}
      <div className={`Categories__category-selected ${displaySelectedPlate ? '--open' : ''} ${activeCategory === 'plate' ? "--active-selected" : ''}`}>
        {selectedPlates.length > 0 && displaySelectedPlate ? (
          selectedPlates.map((item, i) => (
            <li className="Categories__category__button-selected-items-plate" key={`plate-${i}`}>
              {item.name} <span className="--remove" onClick={() => {
                removeItem(item)
                if (selectedPlates.length === 0) { setDisplaySelectedPlate(false) }
                }}>remove x</span>
            </li>
          ))
        ) : null}
      </div>
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-stabilizers${activeCategory === 'stabilizer' ? " --active" : ''}`}
        tabIndex={0} 
        to={Paths.stabilizers}
        onClick={() => setActiveCategory('stabilizer')}>
        stabilizer
      </Link>
      {selectedStabilizers.length > 0 ? (
          <div 
            className={`Categories__category__button-selected-number-stab ${displaySelectedStab ? '--open' : ''} ${activeCategory === 'stabilizer' ? "--active-selected" : ''}`}
            onClick={() => setDisplaySelectedStab((prev => !prev))}>
            {displaySelectedStab ? '>' : selectedStabilizers.length}
          </div>
        ) : null}
      <div className={`Categories__category-selected ${displaySelectedStab && '--display'} ${activeCategory === 'stabilizer' ? "--active-selected" : ''}`}>
        {selectedStabilizers.length > 0 && displaySelectedStab ? (
          selectedStabilizers.map((item, i) => (
            <li className="Categories__category__button-selected-items-stab" key={`stab-${i}`}>
              {item.name} <span className="--remove" onClick={() => {
                removeItem(item)
                if (selectedStabilizers.length === 0) { setDisplaySelectedStab(false) }
                }}>remove x</span>
            </li>
          ))
        ) : null}
      </div>
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-switches${activeCategory === 'switch' ? " --active" : ''}`}
        tabIndex={0} 
        to={Paths.switch}
        onClick={() => setActiveCategory('switch')}>
        switch
      </Link>
      {selectedSwitches.length > 0 ? (
          <div 
            className={`Categories__category__button-selected-number-switch ${displaySelectedSwitch ? '--open' : ''} ${activeCategory === 'switch' ? "--active-selected" : ''}`}
            onClick={() => setDisplaySelectedSwitch((prev => !prev))}>
            {displaySelectedSwitch ? '>' : selectedSwitches.length}
          </div>
        ) : null}
      <div className={`Categories__category-selected ${displaySelectedSwitch && '--display'} ${activeCategory === 'switch' ? "--active-selected" : ''}`}>
        {selectedSwitches.length > 0 && displaySelectedSwitch ? (
          selectedSwitches.map((item, i) => (
            <li className="Categories__category__button-selected-items-switch" key={`switch-${i}`}>
              {item.name} <span className="--remove" onClick={() => {
                removeItem(item)
                if (selectedSwitches.length === 0) { setDisplaySelectedSwitch(false) }
                }}>remove x</span>
            </li>
          ))
        ) : null}
      </div>
    </div>
    <div className="Categories__category">
      <Link
        className={`Categories__category-keycapss${activeCategory === 'keycaps' ? " --active" : ''}`}
        tabIndex={0} 
        to={Paths.keycaps}
        onClick={() => setActiveCategory('keycaps')}>
        keycaps
      </Link>
      {selectedKeycaps.length > 0 ? (
          <div 
            className={`Categories__category__button-selected-number-keycaps ${displaySelectedKeycaps ? '--open' : ''} ${activeCategory === 'keycaps' ? "--active-selected" : ''}`}
            onClick={() => setDisplaySelectedKeycaps((prev => !prev))}>
            {displaySelectedKeycaps ? '>' : selectedKeycaps.length}
          </div>
        ) : null}
      <div className={`Categories__category-selected ${displaySelectedKeycaps && '--display'} ${activeCategory === 'keycaps' ? "--active-selected" : ''}` }>
        {selectedKeycaps.length > 0 && displaySelectedKeycaps ? (
          selectedKeycaps.map((item, i) => (
            <li className="Categories__category__button-selected-items-keycaps" key={`switch-${i}`}>
              {item.name} <span className="--remove" onClick={() => {
                removeItem(item)
                if (selectedKeycaps.length === 0) { setDisplaySelectedKeycaps(false) }
                }}>remove x</span>
            </li>
          ))
        ) : null}
      </div>
    </div>
    <button 
          className="Categories__selected-items-button" 
          onClick={() => displayWatch()}>
            watch list
    </button>
  </div>
)}

export default Categories