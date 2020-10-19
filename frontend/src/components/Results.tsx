import React from 'react'
import './Results.css'

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

const Results = ({results} : ResultsProps) => (
  <div className="Results">
    {console.log('results props', results)}
    this is the results
    {results.map(item => (
      <li className="Results__item">
        <h3>{item.name}</h3>
        <p>instock? {item.stock ? 'yes!' : 'nope'}</p>
        <p><a href={item.vendor.url} target="_blank"><img src={item.vendor.imgURL} alt={item.vendor.name}/></a></p>
      </li>
      ))}
  </div>
)

export default Results