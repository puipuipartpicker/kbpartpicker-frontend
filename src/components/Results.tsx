import React, {useState, useEffect} from 'react'
import './Results.css'
import Product from './Product'
import ProductListItem from './ProductListItem'

interface searchItem {
  id: string
  img_url: string
  in_stock: boolean
  name: string
  price: number
  vendor: string
}

interface ResultsProps {
  results: searchItem[]
  addItem: (selectedProduct: string) => void
}

const Results = ({results, addItem} : ResultsProps) => {
  const [productDisplay, setProductDisplay] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [productPaneHeight, setProductPaneHeight] = useState('')
  const [screenWidth, setScreenWidth] = useState(0)

  const handlePaneHeight = () => {
    const topAreaRect = document.querySelector('.App__top-container')?.getBoundingClientRect()
    const viewPortHeight = window.innerHeight
    if (topAreaRect?.height && topAreaRect.top && viewPortHeight) {
      if ((viewPortHeight - 40) - (topAreaRect?.height + topAreaRect.top) <= viewPortHeight - 60) {
        setProductPaneHeight(`${(viewPortHeight - 60) - (topAreaRect?.height + topAreaRect.top)}px`)
      } else {
        setProductPaneHeight('calc(100vh - 4rem)')
      }
    } 
  }

  useEffect(() => {
    handlePaneHeight()
    window.addEventListener('scroll', (event) => {
      handlePaneHeight()
    })
    window.addEventListener('resize', (event) => setScreenWidth(window.innerWidth))
    setScreenWidth(window.innerWidth)
  }, [])


  const handleProductDisplay = (id: string): void => {
    console.log('ran handleProductDisplay')
    setProductDisplay(true)
    if (id !== selectedProduct) {
      setSelectedProduct(id)
    }
  }
  
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
        {(screenWidth < 600) && (item.id === selectedProduct) && productDisplay && selectedProduct ? (
          <div className="Results__product">
            <button className="Results__product-close" onClick={() => setProductDisplay(false)}>close</button>
            <Product id={selectedProduct} addItem={() => addItem(selectedProduct)}/>
          </div>
        ) : null}
      </div>))}
    </div>
    {(screenWidth >= 600) && productDisplay && selectedProduct ? 
    <div className="Results__product" style={{maxHeight: productPaneHeight}}>
      <button className="Results__product-close" onClick={() => setProductDisplay(false)}>close</button>
      <Product id={selectedProduct} addItem={() => addItem(selectedProduct)}/>
    </div> : null}
  </div>
)}

export default Results