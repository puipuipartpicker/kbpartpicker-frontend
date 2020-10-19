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
}


const Results = ({results} : ResultsProps) => {
  const [productDisplay, setProductDisplay] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')

  const handleProductDisplay = (id: number): void => {
    setProductDisplay(true)
    setSelectedProduct(`${id}`)
  }
  
  return (
  <div className="Results">
    {console.log('results props', results)}
    <div className="Results__items">
    {results.map((item, i) => (
      <div className="Results__items-container" onClick={() => handleProductDisplay(item.id)}>
        <ProductListItem 
          id={item.id}
          name={item.name} 
          imgURL={item.imgURL}
          stock={item.stock}
          priceRange={item.priceRange}
          key={`searchItem` + i} />
      </div>))}
    </div>
    {productDisplay && selectedProduct.length > 0 ? 
    <div className="Results__product">
      <span className="Results__product-close" onClick={() => setProductDisplay(false)}>close x</span>
      <Product id={selectedProduct}/>
    </div> : null}
  </div>
)}

export default Results