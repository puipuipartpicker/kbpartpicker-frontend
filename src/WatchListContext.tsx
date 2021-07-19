import React from "react"
import { useState, useEffect, createContext } from "react"
import { IProductData } from "./types/types"
import { getProductDataByIds } from './backendFunctions'

interface IWatchList {
  cases: IProductData[]
  pcbs: IProductData[]
  plates: IProductData[]
  stabilizers: IProductData[]
  switches: IProductData[]
  keycaps: IProductData[]
  allWatchListIds: string[]
  addItem: (id: string) => void
  removeItem: (id:string) => void
}

export const WatchListContext = createContext<IWatchList>({
  cases: [],
  pcbs: [],
  plates: [],
  stabilizers: [],
  switches: [],
  keycaps: [],
  allWatchListIds: [],
  addItem: () => {},
  removeItem: () => {}
})

interface WatchListProps {
  children: React.ReactChild
}

export const WatchListProvider = ({children}:WatchListProps) => {
  const [cases, setCase] = useState<IProductData[]>([])
  const [pcbs, setPCB] = useState<IProductData[]>([])
  const [plates, setPlate] = useState<IProductData[]>([])
  const [stabilizers, setStabilizer] = useState<IProductData[]>([])
  const [switches, setSwitches] = useState<IProductData[]>([])
  const [keycaps, setKeycaps] = useState<IProductData[]>([])
  const [allWatchListIds, setAllWatchListIds] = useState<string[]>([])

  const sortProductData = (product:IProductData) => {
    switch (product.product_type) {
      case 'case' :
        if (!allWatchListIds.includes(`${product.id}`)) {
          setCase(prevCases => [...prevCases, product])
          setAllWatchListIds(prevIds => [...prevIds, `${product.id}`])
          // if ( 'layout' in product) {
          //   setCaseLayout(prevLayout => [...prevLayout, product.layout])
          // }
        }
        break
      case 'pcb' :
        console.log('selected product is pcb')
        if(!allWatchListIds.includes(`${product.id}`)) {
          setPCB(prevPCB => [...prevPCB, product])
          setAllWatchListIds(prevIds => [...prevIds, `${product.id}`])
          // if ('keyboard_form_factor' in product) {
          //   setPcbLayout(prevLayout => [...prevLayout, product.layout])
          // }
          // if ('hotswap' in product) {
          //   setHotwap(prevHotswap => [...prevHotswap, product])
          // }
        }
        break
      case 'plate' :
        console.log('selected product is plate')
        setPlate(prevPlates => [...prevPlates, product])
        setAllWatchListIds(prevIds => [...prevIds, `${product.id}`])
        // if ('keyboard_form_factor' in product) {
        //   setPlateLayout(prevLayout => [...prevLayout, product.layout])
        // }
        break
      case 'stabilizer' :
        console.log('selected product is stab')
        if(!allWatchListIds.includes(`${product.id}`)) {
          setStabilizer(prevStabs => [...prevStabs, product])
          setAllWatchListIds(prevIds => [...prevIds, `${product.id}`])
          // if ('stabilizer_size' in product) {
          //   setStabSize(prevSize => [...prevSize, product.size])
          // }
          // if ('stabilizer_type' in product) {
          //   setStabMount(prevMount => [...prevMount, product.mount])
          // }
        }
        break
      case 'switch' :
        console.log('selected product is switch')
        if(!allWatchListIds.includes(`${product.id}`)) {
          setAllWatchListIds(prevIds => [...prevIds, `${product.id}`])
          setSwitches(prevSwitches => [...prevSwitches, product])
        }
        break
      case 'keyset' :
        console.log('selected product is keycaps')
        if(!allWatchListIds.includes(`${product.id}`)) {
          setKeycaps(prevKeys => [...prevKeys, product])
          setAllWatchListIds(prevIds => [...prevIds, `${product.id}`])
        break
      }
    }
  }

  const addItem = (selectedProductID: string) => {
    getProductDataByIds([selectedProductID])
    .then(response => {
      const productData:IProductData[] = response.data
      productData.forEach(product => {
        sortProductData(product)
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

  }

  const removeItem = (productId:string) => {
    
  }


  const getWatchItemsFromLocalStorage = ():void => {
    if (localStorage.getItem('selectedItems')) {
      const idsfromStorage = localStorage.getItem('selectedItems')!.split(',')
      idsfromStorage.forEach(id => addItem(id))
    }
  }

  useEffect(() => {

  }, [])

  return (
    <WatchListContext.Provider value={{
      cases,
      pcbs,
      plates,
      stabilizers,
      switches,
      keycaps,
      allWatchListIds,
      addItem,
      removeItem
    }}>
      {children}
    </WatchListContext.Provider>
  )
}