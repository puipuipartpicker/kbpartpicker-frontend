import React from "react"
import { useState, useEffect, createContext } from "react"
import { IProductData } from "@/types/types"
import { getProductDataByIds } from '@/utils/backendFunctions'

interface IWatchList {
  cases: IProductData[]
  pcbs: IProductData[]
  plates: IProductData[]
  stabilizers: IProductData[]
  switches: IProductData[]
  keycaps: IProductData[]
  allWatchListIds: string[]
  addItem: (id: number) => void
  removeItem: (item: IProductData) => void
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

interface IWatchListProps {
  children: React.ReactChild
}

export const WatchListProvider = ({children}:IWatchListProps) => {
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
        setPlate(prevPlates => [...prevPlates, product])
        setAllWatchListIds(prevIds => [...prevIds, `${product.id}`])
        // if ('keyboard_form_factor' in product) {
        //   setPlateLayout(prevLayout => [...prevLayout, product.layout])
        // }
        break
      case 'stabilizer' :
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
        if(!allWatchListIds.includes(`${product.id}`)) {
          setAllWatchListIds(prevIds => [...prevIds, `${product.id}`])
          setSwitches(prevSwitches => [...prevSwitches, product])
        }
        break
      case 'keyset' :
        if(!allWatchListIds.includes(`${product.id}`)) {
          setKeycaps(prevKeys => [...prevKeys, product])
          setAllWatchListIds(prevIds => [...prevIds, `${product.id}`])
        break
      }
    }
  }

  const addItem = (selectedProductID: number) => {
    getProductDataByIds([`${selectedProductID}`])
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

  const removeItem = (item: IProductData) => {
    switch (item.product_type) {
      case 'case' : 
        setCase(prev => prev.filter(cur => cur.id !== item.id))
        setAllWatchListIds(prev => prev.filter(cur => cur !== `${item.id}`))
        break
      case 'pcb' : 
        setPCB(prev => prev.filter(cur => cur.id !== item.id))
        setAllWatchListIds(prev => prev.filter(cur => cur !== `${item.id}`))
        break
      case 'plate' :
        setPlate(prev => prev.filter(cur => cur.id !== item.id))
        setAllWatchListIds(prev => prev.filter(cur => cur !== `${item.id}`))
        break
      case 'stabilizer' :
        setStabilizer(prev => prev.filter(cur => cur.id !== item.id))
        setAllWatchListIds(prev => prev.filter(cur => cur !== `${item.id}`))
        break
      case 'switch' :
        setSwitches(prev => prev.filter(cur => cur.id !== item.id))
        setAllWatchListIds(prev => prev.filter(cur => cur !== `${item.id}`))
        break
      case 'keyset' :
        setKeycaps(prev => prev.filter(cur => cur.id !== item.id))
        setAllWatchListIds(prev => prev.filter(cur => cur !== `${item.id}`))
        break
    }
  }


  const getWatchItemsFromLocalStorage = ():void => {
    if (localStorage.getItem('selectedItems')) {
      const idsfromStorage = localStorage.getItem('selectedItems')!.split(',')
      idsfromStorage.forEach(id => addItem(parseInt(id)))
    }
  }

  useEffect(() => {
    getWatchItemsFromLocalStorage()
  }, [])

  useEffect(() => {
    localStorage.setItem('selectedItems', `${allWatchListIds}`)
  }, [allWatchListIds])

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