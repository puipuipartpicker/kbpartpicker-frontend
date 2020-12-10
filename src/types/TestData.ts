export interface searchItem {
  id: number,
  name: string,
  imgURL: string, 
  stock: boolean,
  priceRange: string,
  vendor: {name: string, url: string, imgURL: string}
}

export type searchResults = searchItem[]

