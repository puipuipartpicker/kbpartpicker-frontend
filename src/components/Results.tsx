import React, {useState, useEffect, useContext} from 'react'
import { WatchListContext } from '../WatchListContext'
import { MessageContext } from '../MessageContext'
import { useHistory } from 'react-router'
import './Results.css'
import Product from './Product'
import ProductListItem from './ProductListItem'
import { ReactComponent as CloseCircle } from '../svg/icon-add-circle.svg'

interface searchItem {
  id: number
  img_url: string
  in_stock: boolean
  name: string
  price: number
  vendor: string
}

interface ResultsProps {
  results: searchItem[]
  defaultDisplayId?: string
}

const Results = ({results} : ResultsProps) => {
  const [productDisplay, setProductDisplay] = useState(false)
  const [selectedProductId, setSelectedProduct] = useState(0)
  const [productPaneHeight, setProductPaneHeight] = useState('')
  const [screenWidth, setScreenWidth] = useState(0)
  const { allWatchListIds , addItem } = useContext(WatchListContext)
  const { setMessageText, setDisplayMessage } = useContext(MessageContext)

  const history = useHistory()

  const handleProductDisplay = (id: number): void => {
    console.log('ran handleProductDisplay')
    setProductDisplay(true)
    if (id !== selectedProductId) {
      setSelectedProduct(id)
      const pathRegexDisplay = /disp=([^&]+)/
      if (pathRegexDisplay.test(history.location.search)) {
        history.push(history.location.search.replace(pathRegexDisplay, `disp=${id}`))
      } else {
        if (history.location.search) {
          history.push(history.location.search.replace(/$/, `&disp=${id}`))
        } else {
          history.push(history.location.search.replace(/$/, `?disp=${id}`))
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', (event) => setScreenWidth(window.innerWidth))
    setScreenWidth(window.innerWidth)
    
    const pathRegexDisplay = /disp=([^&]+)/
    if (pathRegexDisplay.test(history.location.search)) {
      const selectedProductID = history.location.search.match(/disp=([^&]+)/)
      console.log('displayID', selectedProductID![1])
      handleProductDisplay(parseInt(selectedProductID![1]))
    }
  }, [])
  
  return (
  <div className="Results">
    <div className="Results__items">
    {results.map((item, i) => (
      <div 
        className="Results__items-container" 
        key={'result-item-' + i}
        tabIndex={0}
        onKeyDown={(event) => {
          if ((event.key === ' ') || (event.key === 'Enter')) {
            handleProductDisplay(item.id)
          }}}>
          <ProductListItem 
            id={item.id}
            name={item.name} 
            imgURL={item.img_url}
            stock={item.in_stock}
            price={item.price}
            displayProduct={() => handleProductDisplay(item.id)}
            key={`searchItem` + i} />
        {(screenWidth < 600) && (item.id === selectedProductId) && productDisplay && selectedProductId ? (
          <div className="Results__product-container">
            <div className="Results__product">
            <div className="Results__product-close-container" onClick={() => setProductDisplay(false)}>
              <CloseCircle/>
            </div>
              <Product id={selectedProductId}/>
            </div>
          </div>
        ) : null}
      </div>))}
    </div>
    {(screenWidth >= 600) && productDisplay && selectedProductId && results ? (
    <div className="Results__product-container">
      <div className="Results__product" style={{maxHeight: productPaneHeight}}>
        <div className="Results__product-close-container" onClick={() => setProductDisplay(false)}>
          <CloseCircle/>
        </div>
        <Product id={selectedProductId}/>
      </div>
    </div>
    ) : null}
  </div>
)}

export default Results