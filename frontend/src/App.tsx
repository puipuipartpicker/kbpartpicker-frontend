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
import { privateDecrypt } from 'crypto';

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
  const [hotswap, setHotwap] = useState<(boolean | undefined)[]>([])
  const [solderWarning, setSolderWarning] = useState<boolean>(false)
  const [stabSize, setStabSize] = useState<IProductSize[]>([])
  const [stabSizeWarning, setStabSizeWarning] = useState<boolean>(false)
  const [stabMount, setStabMount] = useState<IStabMount[]>([])
  const [stabMountWarning, setStabMountWarning] = useState<boolean>(false)

  const urlPath:string = useHistory().location.pathname.replace(/^\//, '')
  // TODO: make sure to aquire all product keys in an array from the db
  const productKeys = ['123', '666', '456']

  const handleWarningDisplay = () => {
    if (stabMountWarning || stabSizeWarning || solderWarning || layoutWarning) {
      console.log('---- HANDLE WARNING DISPLAY ----')
      console.log('stabmountwarning', stabMountWarning)
      console.log('stabsizewarning', stabSizeWarning)
      console.log('solderWarning', solderWarning)
      console.log('lauoutwarning', layoutWarning)
      console.log('warning Display', warningDisp)
      if (!warningDisp) {
        setWarningNotification(true)
      }
      if (warningDisp && warningNotification) {
        setWarningNotification(true)
        setWarningDisp(false)
      }
      
    } else {
        setWarningDisp(false)
        setWarningNotification(false)
    }
  }

  const checkCompatibility = () => {
    const layoutSets = [...new Set(caseLayout), ...new Set(pcbLayout), ...new Set(plateLayout)]
    console.log('checkCompatability: LAYOUT SETS', layoutSets)
    if ([...new Set(layoutSets)].length > 1) {
      setLayoutWarning(true)
    } else {
      setLayoutWarning(false)
    }

    if (hotswap.includes(true)) {
      setSolderWarning(true)
    } else {
      setSolderWarning(false)
    }

    if (stabSize.includes('7u')) {
      setStabSizeWarning(true)
    } else {
      setStabSizeWarning(false)
    }

    if (stabMount.includes('plate')) {
      console.log('checkCompatability: stabMount', stabMount)
      setStabMountWarning(true)
    } else {
      console.log('checkCompatability: stabMount', stabMount)
      setStabMountWarning(false)
    }
  }

  useEffect(() => {
    updateThemeVariables(theme)
  }, [theme])

  useEffect(() => {
    console.log('check compat from useEffect')
    checkCompatibility()
  }, [caseLayout, pcbLayout, plateLayout, hotswap, stabSize, stabMount])

  useEffect(() => {
    console.log('handle warning display from useEffect')
    handleWarningDisplay()
  }, [stabMountWarning, stabSizeWarning, solderWarning, layoutWarning])

  const checkAdded = (product:IProductData):boolean => {
    let alreadyAdded:boolean = false
    if (product.type === 'case') {
      cases.forEach(item => {
        if (item.name === product.name) {
          alreadyAdded = true
          return
        }
      })
    }
    if (product.type === 'keycaps') {
      keycaps.forEach(item => {
        if (item.name === product.name) {
          alreadyAdded = true
          return
        }
      })
    }
    if (product.type === 'pcb') {
      pcbs.forEach(item => {
        if (item.name === product.name) {
          alreadyAdded = true
          return
        }
      })
    }
    if (product.type === 'plate') {
      plates.forEach(item => {
        if (item.name === product.name) {
          alreadyAdded = true
          return
        }
      })
    }
    if (product.type === 'stabilizers') {
      stabilizers.forEach(item => {
        if (item.name === product.name) {
          alreadyAdded = true
          return
        }
      })
    }
    if (product.type === 'switch') {
      switches.forEach(item => {
        if (item.name === product.name) {
          alreadyAdded = true
          return
        }
      })
    }
    return alreadyAdded
  }

  const addSelectedItem = (selectedProductID: number) => {
    // console.log('add item fired with product id: ', selectedProductID)
    // console.log(getProductData(selectedProductID))
    const product = getProductData(selectedProductID)
    if (product.type === 'case') {
      if (!checkAdded(product)) {
        setCase(prevCases => [...prevCases, product])
        if ( 'layout' in product) {
          setCaseLayout(prevLayout => [...prevLayout, product.layout])
        }
      }
    }
    if (product.type === 'pcb') {
      if (!checkAdded(product)) {
        setPCB(prevPCB => [...prevPCB, product])
        if ('layout' in product) {
          setPcbLayout(prevLayout => [...prevLayout, product.layout])
        }
        if ('hotswap' in product) {
          if (product.hotswap === (true || false)) {
            setHotwap(prevHotswap => [...prevHotswap, product.hotswap])
          }
        }
      }
    }
    if (product.type === 'plate') {
      if (!checkAdded(product)) {
        setPlate(prevPlates => [...prevPlates, product])
        if ('layout' in product) {
          setPlateLayout(prevLayout => [...prevLayout, product.layout])
        }
      }
    }
    if (product.type === 'stabilizers') {
      if(!checkAdded(product)) {
        setStabilizer(prevStabs => [...prevStabs, product])
        if ('size' in product) {
          setStabSize(prevSize => [...prevSize, product.size])
        }
        if ('mount' in product) {
          setStabMount(prevMount => [...prevMount, product.mount])
        }
      }
    } 
    if (product.type === 'switch') {
      if(!checkAdded(product)) {
        setSwitches(prevSwitches => [...prevSwitches, product])
      }
    }
    if (product.type === 'keycaps') {
      if(!checkAdded(product)) {
        setKeycaps(prevKeys => [...prevKeys, product])
      }
    }
  }

  const removeSelectedItem = (product: IProductData): void => {
    // case, pcb, plate, stabilizer, 
    if(product.type === 'case') {
      setCase(cases.filter(item => item.name !== product.name))
      if ('layout' in product) {
        const indexToRemove = caseLayout.findIndex(cur => cur === product.layout)
        setCaseLayout(prevCaseLayout => prevCaseLayout.splice(indexToRemove, 1))
      }
    }
    if(product.type === 'pcb') {
      setPCB(pcbs.filter(item => item.name !== product.name))
      if ('layout' in product) {
        const indexToRemove = pcbLayout.findIndex( layout => layout === product.layout)
        setPcbLayout(prevLayout => prevLayout.splice(indexToRemove, 1))
      }
      if ('hotswap' in product) {
        if (product.hotswap === (true || false)) {
          if (hotswap.includes(product.hotswap)) {
            const indexToRemove = hotswap.indexOf(product.hotswap)
            setHotwap(prevHotswap => prevHotswap.splice(indexToRemove, 1))
          }
        }
      }
    }
    if (product.type === 'plate') {
      console.log('tried to remove plate')
      const indexToRemove = plates.findIndex(cur => cur.name === product.name)
      console.log('plate index', indexToRemove)
      setPlate(plates.filter(cur => cur.name !== product.name))
      if ('layout' in product) {
        setPlateLayout(prevPlateLayout => {
          prevPlateLayout.splice(indexToRemove, 1)
          return prevPlateLayout
        })
      }
    }
    console.log('CASE LAYOUT', caseLayout)
    console.log('pcb LAYOUT', pcbLayout)
    if(product.type === 'stabilizers') {
      setStabilizer(stabilizers.filter(item => item.name !== product.name))
      if (stabSize.includes(product.size)) {
        const indexToRemove = stabSize.indexOf(product.size)
        setStabSize(prevStabSize => prevStabSize.splice(indexToRemove, 1))
        console.log('stab size' , stabSize)
      }
      if (stabMount.includes(product.mount)) {
        const indexToRemove = stabMount.indexOf(product.mount)
        setStabMount(prevStabMount => prevStabMount.splice(indexToRemove, 1))
      }
    }
    if(product.type === 'switch') {
      setSwitches(switches.filter(cur => cur.name !== product.name))
    }
    if (product.type === 'keycaps') {
      const indexToRemove = keycaps.findIndex(cur => cur.name === product.name)
      setKeycaps(keycaps.filter(cur => cur.name !== product.name))
    }
    checkCompatibility()
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
            if (stabMountWarning || stabSizeWarning || solderWarning || layoutWarning) {
              setWarningNotification(true)
            }
            }}>close x</div>
          <Warning  layoutWarning={layoutWarning} solderWarning={solderWarning} stabSizeWarning={stabSizeWarning} stabMountWarning={stabMountWarning}/>
        </div>
        ) : null}
      <div className="App-categories">
        <div className="App-categories__button-cases">
          {cases ? cases.map((item, i) => <li className="App-categories__button-cases-selected" key={`case-${i}`}>{item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span></li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme1')}><Link to={Paths.cases}>cases</Link></button>
        </div>
        <div className="App-categories__button-pcb">
          {pcbs ? pcbs.map((pcb, i) => <li className="App-categories__button-pcb-selected" key={`pcb-${i}`}>{pcb.name} <span onClick={() => removeSelectedItem(pcb)}>remove x</span></li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.pcb}>PCB</Link></button>
        </div>
        <div className="App-categories__button-plate">
          {plates ? plates.map((plate, i) => <li className="App-categories__button-plate-selected" key={`plate-${i}`}>{plate.name} <span onClick={() => removeSelectedItem(plate)}>remove x</span></li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.plates}>plates</Link></button>
        </div>
        <div className="App-categories__button-stabilizer">
          {stabilizers ? stabilizers.map((stabilizer, i) => <li className="App-categories__button-stabilizer-selected" key={`stab-${i}`}>{stabilizer.name} <span onClick={() => removeSelectedItem(stabilizer)}>remove x</span></li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.stabilizers}>stabilizers</Link></button>
        </div>
        <div className="App-categories__button-switch">
          {switches ? switches.map((item, i) => <li className="App-categories__button-switch-selected" key={`switch-${i}`}>{item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span></li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.switches}>switches</Link></button>
        </div>
        <div className="App-categories__button-keycaps">
          {keycaps ? keycaps.map((item, i) => <li className="App-categories__button-keycaps-selected" key={`keycap-${i}`}>{item.name} <span onClick={() => removeSelectedItem(item)}>remove x</span></li>) : null}
          <button className="App-categories-button" onClick={() => setTheme('theme2')}><Link to={Paths.keycaps}>keycaps</Link></button>
        </div>
      </div>

      {
      // TODO: see if themes can be only managed by the App component so it doesn't need to be passed down as a prop
    }
      <Route path="/" />
      <Route path={Paths.cases} render={ (props) => {
        setTheme('theme1')
        return <Search category='cases' addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.pcb} render={ (props) => {
        setTheme('theme2')
        return <Search category='PCBs' addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.plates} render={ (props) => {
        setTheme('theme3')
        return <Search category='plates' addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.stabilizers} render={ (props) => {
        setTheme('theme4')
        return <Search category='stabilizers' addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.switches} render={ (props) => {
        setTheme('theme5')
        return <Search category='switches' addItem={addSelectedItem}/>
      }}/>
      <Route path={Paths.keycaps} render={ (props) => {
        setTheme('theme6') 
        return <Search category='keycaps' addItem={addSelectedItem}/>
      }}/>
      {productKeys.includes(urlPath) ? <Route path={Paths.product} render={ (props) => <Product id={+urlPath}/>} /> : null}


    </div>
  );
}

export default App;
