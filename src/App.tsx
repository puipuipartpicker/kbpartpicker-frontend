import React, {useEffect, useState, useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom'
import { MessageContext } from './MessageContext'
import { WatchListContext } from './WatchListContext'
import Paths from './types/Paths'
import Search from './components/Search'
import Product from './components/Product'
import Warning from './components/Warning'
import Categories from './components/Categories'
import SelectedItems from './components/SelectedItems'
import WatchList from './components/WatchList'
import Notification from './components/Notification'
import { ThemeVariableValues } from './types/types'
import { IProductData, IKeyboardFormFactor,  IStabilizerSize, IStabilizerType} from './types/types'
import updateThemeVariables from './updateThemeVariables'
import axios from 'axios' 
import { url } from 'inspector';
import { getProductDataByIds } from './backendFunctions'

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

  const [allSelectedItemIds, setAllSelectedItemIds] = useState<string[]>([])

  const [displaySelectedItems, setDisplaySelectedItems] = useState<boolean>(false)

  const allSelectedItemData = [cases, pcbs, plates, stabilizers, switches, keycaps]

  const {messageText, setMessageText, displayMessage, setDisplayMessage} = useContext(MessageContext)
  const { addItem } = useContext(WatchListContext)
  // useUpdateUrlParameter('sel', `${allSelectedItemIds}`)

  const urlPath:string = useHistory().location.pathname.replace(/^\//, '')
  const urlParameters:string = useHistory().location.search
  const history = useHistory()
  console.log('useHistory pathname', useHistory().location)
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

<<<<<<< HEAD
  // const addSelectedItem = (selectedProductID: string) => {
  //   getProductDataByIds([selectedProductID])
  //   .then(response => {
  //     console.log('api response:', response)
  //     const product = response.data[0]
  //     switch (product.product_type) {
  //       case 'case' :
  //         if (!allSelectedItemIds.includes(`${selectedProductID}`)) {
  //           setCase(prevCases => [...prevCases, product])
  //           setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
  //           if ( 'layout' in product) {
  //             setCaseLayout(prevLayout => [...prevLayout, product.layout])
  //           }
  //         }
  //         break
  //       case 'pcb' :
  //         console.log('selected product is pcb')
  //         if(!allSelectedItemIds.includes(`${selectedProductID}`)) {
  //           setPCB(prevPCB => [...prevPCB, product])
  //           setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
  //           if ('keyboard_form_factor' in product) {
  //             setPcbLayout(prevLayout => [...prevLayout, product.layout])
  //           }
  //           if ('hotswap' in product) {
  //             setHotwap(prevHotswap => [...prevHotswap, product])
  //           }
  //         }
  //         break
  //       case 'plate' :
  //         console.log('selected product is plate')
  //         setPlate(prevPlates => [...prevPlates, product])
  //         setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
  //         if ('keyboard_form_factor' in product) {
  //           setPlateLayout(prevLayout => [...prevLayout, product.layout])
  //         }
  //         break
  //       case 'stabilizer' :
  //         console.log('selected product is stab')
  //         if(!allSelectedItemIds.includes(`${selectedProductID}`)) {
  //           setStabilizer(prevStabs => [...prevStabs, product])
  //           setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
  //           if ('stabilizer_size' in product) {
  //             setStabSize(prevSize => [...prevSize, product.size])
  //           }
  //           if ('stabilizer_type' in product) {
  //             setStabMount(prevMount => [...prevMount, product.mount])
  //           }
  //         }
  //         break
  //       case 'switch' :
  //         console.log('selected product is switch')
  //         if(!allSelectedItemIds.includes(`${selectedProductID}`)) {
  //           setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
  //           setSwitches(prevSwitches => [...prevSwitches, product])
  //         }
  //         break
  //       case 'keyset' :
  //         console.log('selected product is keycaps')
  //         if(!allSelectedItemIds.includes(`${selectedProductID}`)) {
  //           setKeycaps(prevKeys => [...prevKeys, product])
  //           setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
  //         break
  //       }
  //     }
  //   })
  //   .catch(error => {
  //     if (error.response) {
  //       const logDetails = {
  //         "error message": error.response.data.message,
  //         "http status": error.response.status,
  //         "http error": error.response.statusText
  //       }
  //       console.dir('there was an error returning query results from backend: \n', logDetails)
  //     } else {
  //       console.log('there was an error making a request to the backend: \n', error)
  //     }
  //   })
=======
  const addSelectedItem = (selectedProductID: string) => {
    getProductDataByIds([selectedProductID])
    .then(response => {
      console.log('api response:', response)
      const productData:IProductData[] = response.data
      productData.forEach(product => {
        switch (product.product_type) {
          case 'case' :
            if (!allSelectedItemIds.includes(`${selectedProductID}`)) {
              setCase(prevCases => [...prevCases, product])
              setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
              if ( 'keyboard_form_factor' in product) {
                setCaseLayout(prevLayout => [...prevLayout, product.keyboard_form_factor])
              }
            }
            break
          case 'pcb' :
            console.log('selected product is pcb')
            if(!allSelectedItemIds.includes(`${selectedProductID}`)) {
              setPCB(prevPCB => [...prevPCB, product])
              setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
              if ('keyboard_form_factor' in product) {
                setPcbLayout(prevLayout => [...prevLayout, product.keyboard_form_factor])
              }
              if ('hotswap' in product) {
                setHotwap(prevHotswap => [...prevHotswap, product.hotswap])
              }
            }
            break
          case 'plate' :
            console.log('selected product is plate')
            setPlate(prevPlates => [...prevPlates, product])
            setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
            if ('keyboard_form_factor' in product) {
              setPlateLayout(prevLayout => [...prevLayout, product.keyboard_form_factor])
            }
            break
          case 'stabilizer' :
            console.log('selected product is stab')
            if(!allSelectedItemIds.includes(`${selectedProductID}`)) {
              setStabilizer(prevStabs => [...prevStabs, product])
              setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
              if ('stabilizer_size' in product) {
                setStabSize(prevSize => [...prevSize, product.stabilizer_size])
              }
              if ('stabilizer_type' in product) {
                setStabMount(prevMount => [...prevMount, product.stabilizer_type])
              }
            }
            break
          case 'switch' :
            console.log('selected product is switch')
            if(!allSelectedItemIds.includes(`${selectedProductID}`)) {
              setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
              setSwitches(prevSwitches => [...prevSwitches, product])
            }
            break
          case 'keyset' :
            console.log('selected product is keycaps')
            if(!allSelectedItemIds.includes(`${selectedProductID}`)) {
              setKeycaps(prevKeys => [...prevKeys, product])
              setAllSelectedItemIds(prevIds => [...prevIds, `${selectedProductID}`])
            break
          }
        }
      });
    })
    .catch(error => {
      if (error.response) {
        const logDetails = {
          "error message": error.response.data.message,
          "http status": error.response.status,
          "http error": error.response.statusText
        }
        console.dir('there was an error returning query results from backend: \n', logDetails)
      } else {
        console.log('there was an error making a request to the backend: \n', error)
      }
    })
>>>>>>> b60c47c589aae07a38c4dd9bb838d007d7af84cd

  // }

  // TODO: refactor to switch statement
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
      setAllSelectedItemIds(prev => prev.filter(cur => cur !== product.id))
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
      setAllSelectedItemIds(prev => prev.filter(cur => cur !== product.id))
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
      setSwitches(switches.filter(cur => cur.id !== product.id))
      console.log(allSelectedItemIds)
      console.log(product.id)
      setAllSelectedItemIds(allSelectedItemIds.filter(cur => cur !== `${product.id}`))
    }
    if (product.product_type === 'keyset') {
      setKeycaps(keycaps.filter(cur => cur.id !== product.id))
      setAllSelectedItemIds(prev => prev.filter(cur => cur !== product.id))
    }
    checkCompatibility()
  }

  const getWatchItemsFromLocalStorage = ():void => {
    if (localStorage.getItem('selectedItems')) {
      const idsfromStorage = localStorage.getItem('selectedItems')!.split(',')
      idsfromStorage.forEach(id => addItem(id))
    }
  }

  useEffect(() => {
    getWatchItemsFromLocalStorage()
  },[])

  useEffect(() => {
    updateThemeVariables(theme)
  }, [theme])

  useEffect(() => {
    // history.push(handleParameterUpdate(history.location.search, 'sel', `${allSelectedItemIds}`))
    localStorage.setItem('selectedItems', `${allSelectedItemIds}`)
  }, [allSelectedItemIds])

  useEffect(() => {
    if (displayMessage) {
      setTimeout(() => {
        setDisplayMessage(false)
      }, 2500);
    }
  }, [messageText, displayMessage])

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
      {displayMessage ? <Notification message={messageText}/> : null}
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
          displayWatch={() => setDisplaySelectedItems(prevDisp => !prevDisp)}
          selectedCases={cases}
          selectedPcb={pcbs}
          selectedPlates={plates}
          selectedStabilizers={stabilizers}
          selectedSwitches={switches}
          selectedKeycaps={keycaps}
        />
        {displaySelectedItems && (
          <div className="App__selected-items-container scale-in-hor-right">
            <button className="App__selected-items-close" onClick={() => setDisplaySelectedItems(prevDisp => !prevDisp)}>close</button>
            <SelectedItems 
              ids={allSelectedItemIds}
              selectedCases={cases}
              selectedPcb={pcbs}
              selectedPlates={plates}
              selectedStabilizers={stabilizers}
              selectedSwitches={switches}
              selectedKeycaps={keycaps}
              remove={removeSelectedItem}
            />
          </div>
        )}
      </div>
      {
    }
    {/* running set theme in rout in order to make sure the theme sets based on URL params */}
      <Route path="/" />
      <Route path={Paths.cases} render={ (props) => {
        setTheme('8008')
        return <Search bar={true} category='case' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.pcb} render={ (props) => {
        setTheme('mizu')
        return <Search bar={true} category='pcb' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.plates} render={ (props) => {
        setTheme('modernDolch')
        return <Search bar={true} category='plate' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.stabilizers} render={ (props) => {
        setTheme('superuser')
        return <Search bar={true} category='stabilizer' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.switch} render={ (props) => {
        setTheme('taro')
        return <Search bar={true} category='switch' addItem={addSelectedItem}/>}}/>
      <Route path={Paths.keycaps} render={ (props) => {
        setTheme('retrocast')
        return <Search bar={true} category='keyset' addItem={addSelectedItem}/>}}/>
      {productKeys.includes(urlPath) ? <Route path={Paths.product} render={ (props) => <Product id={urlPath} addItem={addSelectedItem}/>} /> : null}
      <Route path={Paths.list} render={(props) => {
        return (
          <SelectedItems 
            ids={allSelectedItemIds}
            selectedCases={cases}
            selectedPcb={pcbs}
            selectedPlates={plates}
            selectedStabilizers={stabilizers}
            selectedSwitches={switches}
            selectedKeycaps={keycaps}
            remove={removeSelectedItem}
          />
        )}}/>
        <Route path={Paths.test} render={(props) => {
          return (
            <WatchList
              allSelectedIds={allSelectedItemIds}
              addItem={addSelectedItem} 
              removeItem={removeSelectedItem}
            />
          )}}/>

    </div>
  );
}

export default App;
