import { IProductData, IPriductDatabase } from './types/types'
import { ProductTestData } from './TestData'

export const getProductData = (id: number): IProductData => {
  return ProductTestData[id]
}
