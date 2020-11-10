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

function App() {
  const [theme, setTheme] = useState<keyof ThemeVariableValues>('theme1')
  const [cases, setCase] = useState<IProductData[]>([])
  const [pcbs, setPCB] = useState<IProductData[]>([])
  const [plates, setPlate] = useState<IProductData[]>([])
  const [stabilizers, setStabilizer] = useState<IProductData[]>([])
  const [switchs, setSwitches] = useState<IProductData[]>([])
  const [keycaps, setKeycaps] = useState<IProductData[]>([])

  const [warningNotification, setWarningNotification] = useState<boolean>(false)
  const [warningDisp, setWarningDisp] = useState<boolean>(false)
  const [caseSize, setCaseSize] = useState<IProductLayout[]>(['sixty_percent'])
  const [pcbSize, setPCBSize] = useState<IProductLayout[]>([])
  const [plateSize, setPlateSize] = useState<IProductLayout[]>(['forty_percent'])
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

  const checkCompatibility = () => {
    const sizeSets = [...new Set(caseSize), ...new Set(pcbSize), ...new Set(plateSize)]
    if ([...new Set(sizeSets)].length > 1) {
      setWarningNotification(true)
      setLayoutWarning(true)
    } 
    // TODO: check if any selected PCB's are non-hotswap
    if (!hotswap) {
      setSolderWarning(true)
    }
    // TODO: check if 7u stab is selected 
    if (stabSize.includes('7u')) {
      setStabSizeWarning(true)
    }
    // TODO: check if plate mount stabilizer is selected 
    if (stabMount.includes('plate')) {
      setStabMountWarning(true)
    }
  }

  useEffect(() => {
    updateThemeVariables(theme)
  }, [theme])

  useEffect(() => {
  // TODO: checkCompatibility whenever compatibility state variables change 
    checkCompatibility()
  }, [caseSize, pcbSize, plateSize, hotswap, stabSize, stabMount])

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
            checkCompatibility()
            }}>close x</div>
          <Warning  layoutWarning={layoutWarning} solderWarning={solderWarning} stabSizeWarning={stabSizeWarning} stabMountWarning={stabMountWarning}/>
        </div>
        ) : null}
      <div className="App-categories">
        <button className="App-categories-button" onClick={() => setTheme('theme1')}><Link to={Paths.cases}>Cases</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.pcb}>PCB</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme3')}><Link to={Paths.plates}>Plates</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme4')}><Link to={Paths.stabilizers}>Stabilizers</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme5')}><Link to={Paths.switches}>Switches</Link></button>
        <button className="App-categories-button" onClick={() => setTheme('theme6')}><Link to={Paths.keycaps}>Keycaps</Link></button>
      </div>

      {
      // TODO: see if themes can be only managed by the App component so it doesn't need to be passed down as a prop
    }
      <Route path="/" />
      <Route path={Paths.cases} render={ (props) => {
        setTheme('theme1')
        return <Search category='cases' theme={theme}/>
      }}/>
      <Route path={Paths.pcb} render={ (props) => {
        setTheme('theme2')
        return <Search category='PCBs' theme={theme}/>
      }}/>
      <Route path={Paths.plates} render={ (props) => {
        setTheme('theme3')
        return <Search category='plates' theme={theme}/>
      }}/>
      <Route path={Paths.stabilizers} render={ (props) => {
        setTheme('theme4')
        return <Search category='stabilizers' theme={theme}/>
      }}/>
      <Route path={Paths.switches} render={ (props) => {
        setTheme('theme5')
        return <Search category='switches' theme={theme}/>
      }}/>
      <Route path={Paths.keycaps} render={ (props) => {
        setTheme('theme6') 
        return <Search category='keycaps' theme={theme}/>
      }}/>
      {productKeys.includes(urlPath) ? <Route path={Paths.product} render={ (props) => <Product id={urlPath}/>} /> : null}


    </div>
  );
}

export default App;
