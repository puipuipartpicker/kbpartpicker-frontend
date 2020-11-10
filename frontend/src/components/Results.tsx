import React, {useState} from 'react'
import './Results.css'
import Product from './Product'
import ProductListItem from './ProductListItem'

interface searchItem {
  id: number,
  name: string,
  imgURL: string, 
  stock: boolean,
  priceRange: string,
  vendor: {name: string, url: string, imgURL: string}
}

interface ResultsProps {
  results: searchItem[]
  addItem: (selectedProduct: number) => void
}


const Results = ({results, addItem} : ResultsProps) => {
  const [productDisplay, setProductDisplay] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(0)

  const handleProductDisplay = (id: number): void => {
    setProductDisplay(true)
    setSelectedProduct(id)
  }
  
  return (
  <div className="Results">
    {console.log('results props', results)}
    <div className="Results__items">
    {results.map((item, i) => (
      <div className="Results__items-container" key={'result-item-' + i} onClick={() => handleProductDisplay(item.id)}>
        <ProductListItem 
          id={item.id}
          name={item.name} 
          imgURL={item.imgURL}
          stock={item.stock}
          priceRange={item.priceRange}
          key={`searchItem` + i} />
      </div>))}
    </div>
    {productDisplay && selectedProduct > 0 ? 
    <div className="Results__product">
      <div className="Results__product-close" onClick={() => setProductDisplay(false)}>close x</div>
      <div className="Results__product-add-select" onClick={() => addItem(selectedProduct)}>add to selected items</div>
      <Product id={selectedProduct}/>
    </div> : null}
  </div>
)}

export default Results