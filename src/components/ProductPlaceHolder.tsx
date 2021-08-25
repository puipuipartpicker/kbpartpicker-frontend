import React from "react";
import './ProductPlaceHolder.css'

const ProductPlaceHolder = () => (
  <div className="ProductPlaceHolder">
    <div className="ProductPlaceHolder-img-name-container">
      <div className="ProductPlaceHolder__image"></div>
      <div className="ProductPlaceHolder__title-container">
        <h2 className="ProductPlaceHolder__title">loading...</h2>
      </div>
    </div>
    <div className="ProductPlaceHolder__vendors"></div>
    <div className="ProductPlaceHolder__button"></div>
  </div>
)

export default ProductPlaceHolder