import React, {useState, useEffect} from 'react'
import './Results.css'
import Product from './Product'
import ProductListItem from './ProductListItem'

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
  addItem: (selectedProduct: number) => void
}

const Results = ({results, addItem} : ResultsProps) => {
  const [productDisplay, setProductDisplay] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [productPaneHeight, setProductPaneHeight] = useState('')

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
  }, [])


  const handleProductDisplay = (id: number): void => {
    setProductDisplay(true)
    setSelectedProduct(id)
  }
  
  return (
  <div className="Results">
    <div className="Results__items">
    {results.map((item, i) => (
      <div className="Results__items-container" key={'result-item-' + i} onClick={() => handleProductDisplay(item.id)}>
        <ProductListItem 
          id={item.id}
          name={item.name} 
          imgURL={item.img_url}
          stock={item.in_stock}
          price={item.price}
          key={`searchItem` + i} />
      </div>))}
    </div>
    {productDisplay && selectedProduct ? 
    <div className="Results__product" style={{maxHeight: productPaneHeight}}>
      <div className="Results__product-close" onClick={() => setProductDisplay(false)}>close x</div>
      <div className="Results__product-add-select" onClick={() => addItem(selectedProduct)}>add to selected items</div>
      <Product id={selectedProduct}/>
    </div> : null}
  </div>
)}

export default Results