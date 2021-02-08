import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom'
import Paths from './types/Paths'
import Search from './components/Search'
import Product from './components/Product'
import Warning from './components/Warning'
import Categories from './components/Categories'
import { ThemeVariableValues } from './types/types'
import { IProductData, IKeyboardFormFactor,  IStabilizerSize, IStabilizerType} from './types/types'
import updateThemeVariables from './updateThemeVariables'
// import { getProductData } from './dbFunctions'
import axios from 'axios' 
// import { profile } from 'console';
// import { link } from 'fs';
// import { privateDecrypt } from 'crypto';

function App() {
  const [theme, setTheme] = useState<keyof ThemeVariableValues>("8008")
  const [cases, setCase] = useState<IProductData[]>([])
  const [pcbs, setPCB] = useState<IProductData[]>([])
  const [plates, setPlate] = useState<IProductData[]>([])
  const [stabilizers, setStabilizer] = useState<IProductData[]>([])
  const [switches, setSwitches] = useState<IProductData[]>([])
  const [keycaps, setKeycaps] = useState<IProductData[]>([])

  const [warningNotification, setWarningNotification] = useState<boolean>(false)
  const [warningDisp, setWarningDisp] = useState<boolean>(false)
  const [caseLayout, setCaseLayout] = useState<IKeyboardFormFactor[]>([])
  const [pcbLayout, setPcbLayout] = useState<IKeyboardFormFactor[]>([])
  const [plateLayout, setPlateLayout] = useState<IKeyboardFormFactor[]>([])
  const [layoutWarning, setLayoutWarning] = useState<boolean>(false)
  const [hotswap, setHotwap] = useState<(boolean | undefined)[]>([])
  const [solderWarning, setSolderWarning] = useState<boolean>(false)
  const [stabSize, setStabSize] = useState<IStabilizerSize[]>([])
  const [stabSizeWarning, setStabSizeWarning] = useState<boolean>(false)
  const [stabMount, setStabMount] = useState<IStabilizerType[]>([])
  const [stabMountWarning, setStabMountWarning] = useState<boolean>(false)

  const [allSelectedItems, setAllSelectedItems] = useState<string[]>([])



  const urlPath:string = useHistory().location.pathname.replace(/^\//, '')
  // TODO: make sure to aquire all product keys in an array from the db
  const productKeys = ['123', '666', '456', '90', '398']

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

    if (stabSize.includes('seven_u')) {
      setStabSizeWarning(true)
    } else {
      setStabSizeWarning(false)
    }

    if (stabMount.includes('plate_mount')) {
      console.log('checkCompatability: stabMount', stabMount)
      setStabMountWarning(true)
    } else {
      console.log('checkCompatability: stabMount', stabMount)
      setStabMountWarning(false)
    }
  }

  const addSelectedItem = (selectedProductID: string) => {

    const getProductData = (id:string): any => {
      axios.get(`${process.env.REACT_APP_API_URL}/get`, {params: {id:id}})
      .then(response => {
        console.log('api response:', response)
        const product = response.data
        switch (product.product_type) {
          case 'case' :
            if (!allSelectedItems.includes(id)) {
              setAllSelectedItems(prevIds => [...prevIds, id])
              setCase(prevCases => [...prevCases, product])
              if ( 'layout' in product) {
                setCaseLayout(prevLayout => [...prevLayout, product.layout])
              }
            }
            break
          case 'pcb' :
            console.log('selected product is pcb')
            break
          case 'plate' :
            console.log('selected product is plate')
            break
          case 'stabilizers' :
            console.log('selected product is stab')
            break
          case 'switch' :
            console.log('selected product is switch')
            if(!allSelectedItems.includes(id)) {
              setAllSelectedItems(prevIds => [...prevIds, id])
              setSwitches(prevSwitches => [...prevSwitches, product])
            }
            break
          case 'keycaps' :
            console.log('selected product is keycaps')
            break
        }
        
      })
      .catch(error => console.log(error))
    }

    getProductData(selectedProductID)



    // if (product.type === 'case') {
    //   if (!checkAdded(product)) {
    //     setCase(prevCases => [...prevCases, product])
    //     if ( 'layout' in product) {
    //       setCaseLayout(prevLayout => [...prevLayout, product.layout])
    //     }
    //   }
    // }
    // if (product.type === 'pcb') {
    //   if (!checkAdded(product)) {
    //     setPCB(prevPCB => [...prevPCB, product])
    //     if ('layout' in product) {
    //       setPcbLayout(prevLayout => [...prevLayout, product.layout])
    //     }
    //     if ('hotswap' in product) {
    //       if (product.hotswap === (true || false)) {
    //         setHotwap(prevHotswap => [...prevHotswap, product.hotswap])
    //       }
    //     }
    //   }
    // }
    // if (product.type === 'plate') {
    //   if (!checkAdded(product)) {
    //     setPlate(prevPlates => [...prevPlates, product])
    //     if ('layout' in product) {
    //       setPlateLayout(prevLayout => [...prevLayout, product.layout])
    //     }
    //   }
    // }
    // if (product.type === 'stabilizers') {
    //   if(!checkAdded(product)) {
    //     setStabilizer(prevStabs => [...prevStabs, product])
    //     if ('size' in product) {
    //       setStabSize(prevSize => [...prevSize, product.size])
    //     }
    //     if ('mount' in product) {
    //       setStabMount(prevMount => [...prevMount, product.mount])
    //     }
    //   }
    // } 
    // if (product.type === 'switch') {
    //   if(!checkAdded(product)) {
    //     setSwitches(prevSwitches => [...prevSwitches, product])
    //   }
    // }
    // if (product.type === 'keycaps') {
    //   if(!checkAdded(product)) {
    //     setKeycaps(prevKeys => [...prevKeys, product])
    //   }
    // }
  }

  const removeSelectedItem = (product: IProductData): void => {
    // case, pcb, plate, stabilizer, 
    if(product.product_type === 'case') {
      setCase(cases.filter(item => item.name !== product.name))
      if ('layout' in product) {
        // const indexToRemove = caseLayout.findIndex(cur => cur === product.keyboard_form_factor)
        // setCaseLayout(prevCaseLayout => prevCaseLayout.splice(indexToRemove, 1))
      }
    }
    if(product.product_type === 'pcb') {
      setPCB(pcbs.filter(item => item.name !== product.name))
      if ('layout' in product) {
        // const indexToRemove = pcbLayout.findIndex( layout => layout === product.layout)
        // setPcbLayout(prevLayout => prevLayout.splice(indexToRemove, 1))
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
    if (product.product_type === 'plate') {
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
    if(product.product_type === 'stabilizer') {
      setStabilizer(stabilizers.filter(item => item.name !== product.name))
      if (stabSize.includes(product.stabilizer_size)) {
        const indexToRemove = stabSize.indexOf(product.stabilizer_size)
        setStabSize(prevStabSize => prevStabSize.splice(indexToRemove, 1))
        console.log('stab size' , stabSize)
      }
      // if (stabMount.includes(product.mount)) {
      //   const indexToRemove = stabMount.indexOf(product.mount)
      //   setStabMount(prevStabMount => prevStabMount.splice(indexToRemove, 1))
      // }
    }
    if(product.product_type === 'switch') {
      setSwitches(switches.filter(cur => cur.name !== product.name))
    }
    if (product.product_type === 'keyset') {
      setKeycaps(keycaps.filter(cur => cur.name !== product.name))
    }
    checkCompatibility()
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

  return (
    <div className={`App ${theme}`}>
      <div className="App__top-container">
        <h1 className="App__header">KBPartPicker <span className="App__header-cta">to start your search select a category</span></h1>
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
        <Categories 
          removeSelectedItem={removeSelectedItem}
          selectedCases={cases}
          selectedPcb={pcbs}
          selectedPlates={plates}
          selectedStabilizers={stabilizers}
          selectedSwitches={switches}
          selectedKeycaps={keycaps}
        />
      </div>
      {
    }
    {/* running set theme in rout in order to make sure the theme sets based on URL params */}
      <Route path="/" />
      <Route path={Paths.cases} render={ (props) => {
        setTheme('8008')
        return <Search category='case' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.pcb} render={ (props) => {
        setTheme('mizu')
        return <Search category='pcb' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.plates} render={ (props) => {
        setTheme('modernDolch')
        return <Search category='plate' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.stabilizers} render={ (props) => {
        setTheme('superuser')
        return <Search category='stabilizer' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.switch} render={ (props) => {
        setTheme('taro')
        return <Search category='switch' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.keycaps} render={ (props) => {
        setTheme('retrocast')
        return <Search category='keyset' addItem={addSelectedItem}/>}}/>
      {productKeys.includes(urlPath) ? <Route path={Paths.product} render={ (props) => <Product id={urlPath} addItem={addSelectedItem}/>} /> : null}


    </div>
  );
}

export default App;
