import React, {useEffect, useState, useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom'
import { MessageContext } from './context/MessageContext'
import { WatchListContext } from './context/WatchListContext'
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
import updateThemeVariables from './utils/updateThemeVariables'
import { getProductDataByIds } from './utils/backendFunctions'


function App() {
  const {messageText, setMessageText, displayMessage, setDisplayMessage} = useContext(MessageContext)
  const { cases, pcbs, plates, stabilizers, switches, keycaps, allWatchListIds, addItem } = useContext(WatchListContext)

  const [theme, setTheme] = useState<keyof ThemeVariableValues>("8008")

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


  const [displaySelectedItems, setDisplaySelectedItems] = useState<boolean>(false)

  const allSelectedItemData = [cases, pcbs, plates, stabilizers, switches, keycaps]

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


  useEffect(() => {
    updateThemeVariables(theme)
  }, [theme])

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
              ids={allWatchListIds}
              selectedCases={cases}
              selectedPcb={pcbs}
              selectedPlates={plates}
              selectedStabilizers={stabilizers}
              selectedSwitches={switches}
              selectedKeycaps={keycaps}
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
        return <Search bar={true} category='case'/>}}/>
      <Route path={Paths.pcb} render={ (props) => {
        setTheme('mizu')
        return <Search bar={true} category='pcb'/>}}/>
      <Route path={Paths.plates} render={ (props) => {
        setTheme('modernDolch')
        return <Search bar={true} category='plate'/>}}/>
      <Route path={Paths.stabilizers} render={ (props) => {
        setTheme('superuser')
        return <Search bar={true} category='stabilizer'/>}}/>
      <Route path={Paths.switch} render={ (props) => {
        setTheme('taro')
        return <Search bar={true} category='switch'/>}}/>
      <Route path={Paths.keycaps} render={ (props) => {
        setTheme('retrocast')
        return <Search bar={true} category='keyset'/>}}/>
      {productKeys.includes(urlPath) ? <Route path={Paths.product} render={ (props) => <Product id={parseInt(urlPath)}/>} /> : null}
      <Route path={Paths.list} render={(props) => {
        return (
          <SelectedItems 
            ids={allWatchListIds}
            selectedCases={cases}
            selectedPcb={pcbs}
            selectedPlates={plates}
            selectedStabilizers={stabilizers}
            selectedSwitches={switches}
            selectedKeycaps={keycaps}
          />
        )}}/>
        <Route path={Paths.test} render={(props) => {
          return (
            <WatchList
              allSelectedIds={allWatchListIds}
            />
          )}}/>

    </div>
  );
}

export default App;
