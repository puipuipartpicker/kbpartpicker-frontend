interface Product {
    id: number,
    name: string,
    imgURL: string, 
    stock: boolean,
    price: string,
    vendor: {name: string, url: string, imgURL: string}
}

interface testResultData {
  results: Product[]
}

export default testResultData