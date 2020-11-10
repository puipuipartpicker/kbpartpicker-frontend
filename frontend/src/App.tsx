import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, useParams, useHistory } from 'react-router-dom'
import Paths from './types/Paths'
import Search from './components/Search'
import Product from './components/Product'
import Warning from './components/Warning'
import { Themes, ThemeVariableValues } from './types/types'
import { IProductData, IProductType, IProductSize, IProductLayout, IStabMount } from './types/types'
import updateThemeVariables from './updateThemeVariables'
import { getProductData } from './dbFunctions'
import { profile } from 'console';
import { link } from 'fs';

function App() {
  const [theme, setTheme] = useState<keyof ThemeVariableValues>('theme1')
  const [cases, setCase] = useState<IProductData[]>([])
  const [pcbs, setPCB] = useState<IProductData[]>([])
  const [plates, setPlate] = useState<IProductData[]>([])
  const [stabilizers, setStabilizer] = useState<IProductData[]>([])
  const [switches, setSwitches] = useState<IProductData[]>([])
  const [keycaps, setKeycaps] = useState<IProductData[]>([])

  const [warningNotification, setWarningNotification] = useState<boolean>(false)
  const [warningDisp, setWarningDisp] = useState<boolean>(false)
  const [caseLayout, setCaseLayout] = useState<IProductLayout[]>([])
  const [pcbLayout, setPcbLayout] = useState<IProductLayout[]>([])
  const [plateLayout, setPlateLayout] = useState<IProductLayout[]>([])
  const [layoutWarning, setLayoutWarning] = useState<boolean>(false)
  const [hotswap, setHotwap] = useState<boolean>(false)
  const [solderWarning, setSolderWarning] = useState<boolean>(false)
  const [stabSize, setStabSize] = useState<IProductSize[]>([])
  const [stabSizeWarning, setStabSizeWarning] = useState<boolean>(false)
  const [stabMount, setStabMount] = useState<IStabMount[]>([])
  const [stabMountWarning, setStabMountWarning] = useState<boolean>(false)

  console.log('useParams:',useParams())
  console.log('useHistory:', useHistory().location.pathname)
  const urlPath:string = useHistory().location.pathname.replace(/^\//, '')
  // TODO: make sure to aquire all product keys in an array from the db
  const productKeys = ['123', '666', '456']
  console.log(urlPath)

  const handleWarningDisplay = () => {
    if (!warningNotification && !warningDisp) {
      setWarningNotification(true)
    }
    if (warningNotification && warningDisp) {
      setWarningNotification(false)
      setWarningDisp(true)
    }
  }

  const checkCompatibility = () => {
    const sizeSets = [...new Set(caseLayout), ...new Set(pcbLayout), ...new Set(plateLayout)]
    if ([...new Set(sizeSets)].length > 1) {
      setLayoutWarning(true)
      handleWarningDisplay()
    } 
    // TODO: check if any selected PCB's are non-hotswap
    if (hotswap) {
      setSolderWarning(true)
      handleWarningDisplay()
    }
    // TODO: check if 7u stab is selected 
    if (stabSize.includes('7u')) {
      setStabSizeWarning(true)
      handleWarningDisplay()
    }
    // TODO: check if plate mount stabilizer is selected 
    if (stabMount.includes('plate')) {
      setStabMountWarning(true)
      handleWarningDisplay()
    }
  }

  useEffect(() => {
    updateThemeVariables(theme)
  }, [theme])

  useEffect(() => {
    checkCompatibility()
  }, [caseLayout, pcbLayout, plateLayout, hotswap, stabSize, stabMount])

  const addSelectedItem = (selectedProductID: number) => {
    console.log('add item fired with product id: ', selectedProductID)
    console.log(getProductData(selectedProductID))
    const product = getProductData(selectedProductID)
    if (product.type === 'case') {
      setCase(prevCases => [...prevCases, product])
      if ( 'layout' in product) {
        setCaseLayout(prevLayout => [...prevLayout, product.layout])
      }
    }
    if (product.type === 'pcb') {
      setPCB(prevPCB => [...prevPCB, product])
      if ('layout' in product) {
        setPcbLayout(prevLayout => [...prevLayout, product.layout])
      }
      if ('hotswap' in product) {
        if (product.hotswap) setHotwap(true)
      }
    }
    if (product.type === 'plate') {
      setPlate(prevPlates => [...prevPlates, product])
      if ('layout' in product) {
        setPlateLayout(prevLayout => [...prevLayout, product.layout])
      }
    }
    if (product.type === 'stabilizers') {
      setStabilizer(prevStabs => [...prevStabs, product])
      if ('size' in product) {
        setStabSize(prevSize => [...prevSize, product.size])
      }
      if ('mount' in product) {
        setStabMount(prevMount => [...prevMount, product.mount])
      }
    } 
    if (product.type === 'switch') {setSwitches(prevSwitches => [...prevSwitches, product])}
    if (product.type === 'keycaps') {setKeycaps(prevKeys => [...prevKeys, product])}
  }

  const removeSelectedItem = () => {
    //TODO
  }

  return (
    <div className={`App ${theme}`}>
      <h1 className="App__header">KBPartPicker</h1>
      <p>what are you looking for?</p>
      {warningNotification ? 
        <div 
          className="App__warning-notification" 
          onClick={() => {
            setWarningNotification(false)
            setWarningDisp(true)}
          }>!</div> : null}
      {warningDisp ? (
        <div className="App__warning">
          <div className="App__warning-close" onClick={() => {
            setWarningDisp(false)
            setWarningNotification(true)
            }}>close x</div>
          <Warning  layoutWarning={layoutWarning} solderWarning={solderWarning} stabSizeWarning={stabSizeWarning} stabMountWarning={stabMountWarning}/>
        </div>
        ) : null}
      <div className="App-categories">
        <div className="App-categories__button-cases">
          {cases ? cases.map((item, i) => <li className="App-categories__button-cases-selected" key={`case-${i}`}>{item.name}</li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme1')}><Link to={Paths.cases}>cases</Link></button>
        </div>
        <div className="App-categories__button-pcb">
          {pcbs ? pcbs.map((pcb, i) => <li className="App-categories__button-pcb-selected" key={`pcb-${i}`}>{pcb.name}</li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.pcb}>PCB</Link></button>
        </div>
        <div className="App-categories__button-plate">
          {plates ? plates.map((plate, i) => <li className="App-categories__button-plate-selected" key={`plate-${i}`}>{plate.name}</li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.plates}>plates</Link></button>
        </div>
        <div className="App-categories__button-stabilizer">
          {stabilizers ? stabilizers.map((stabilizer, i) => <li className="App-categories__button-stabilizer-selected" key={`stab-${i}`}>{stabilizer.name}</li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.stabilizers}>stabilizers</Link></button>
        </div>
        <div className="App-categories__button-switch">
          {switches ? switches.map((item, i) => <li className="App-categories__button-switch-selected" key={`switch-${i}`}>{item.name}</li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.switches}>switches</Link></button>
        </div>
        <div className="App-categories__button-keycaps">
          {keycaps ? keycaps.map((item, i) => <li className="App-categories__button-keycaps-selected" key={`keycap-${i}`}>{item.name}</li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.keycaps}>keycaps</Link></button>
        </div>
      </div>

      {
      // TODO: see if themes can be only managed by the App component so it doesn't need to be passed down as a prop
    }
      <Route path="/" />
      <Route path={Paths.cases} render={ (props) => {
        setTheme('theme1')
        return <Search category='cases' theme={theme} addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.pcb} render={ (props) => {
        setTheme('theme2')
        return <Search category='PCBs' theme={theme} addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.plates} render={ (props) => {
        setTheme('theme3')
        return <Search category='plates' theme={theme} addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.stabilizers} render={ (props) => {
        setTheme('theme4')
        return <Search category='stabilizers' theme={theme} addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.switches} render={ (props) => {
        setTheme('theme5')
        return <Search category='switches' theme={theme} addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.keycaps} render={ (props) => {
        setTheme('theme6') 
        return <Search category='keycaps' theme={theme} addItem={addSelectedItem}/>
      }}/>
      {productKeys.includes(urlPath) ? <Route path={Paths.product} render={ (props) => <Product id={+urlPath}/>} /> : null}


    </div>
  );
}

export default App;
