export type Themes = 'theme1'|'theme2'|'theme3'|'theme4'|'theme5'|'theme6'|'default'

// --darkest-color: #161a1f;
//   --lightest-color: white;
//   --bg-color: #333a45;
//   --primary-text-color: #939eae;
//   --primary-color: #f44c7f;
//   --secondary-color:#e11251;
//   --highlight-color: #fa8cad;

export interface ThemeVariableValues {
  "8008": {
    darkestColor: string
    lightestColor: string
    bgColor: string
    primaryTextColor: string
    primaryColor: string
    secondaryColor: string
    highlightColor: string
    secondHighlightColor: string
  }
  mizu: {
    darkestColor: string
    lightestColor: string
    bgColor: string
    primaryTextColor: string
    primaryColor: string
    secondaryColor: string
    highlightColor: string
    secondHighlightColor: string
  }
  modernDolch: {
    darkestColor: string
    lightestColor: string
    bgColor: string
    primaryTextColor: string
    primaryColor: string
    secondaryColor: string
    highlightColor: string
    secondHighlightColor: string
  }
  superuser: {
    darkestColor: string
    lightestColor: string
    bgColor: string
    primaryTextColor: string
    primaryColor: string
    secondaryColor: string
    highlightColor: string
    secondHighlightColor: string
  }
  taro: {
    darkestColor: string
    lightestColor: string
    bgColor: string
    primaryTextColor: string
    primaryColor: string
    secondaryColor: string
    highlightColor: string
    secondHighlightColor: string
  }
  retrocast: {
    darkestColor: string
    lightestColor: string
    bgColor: string
    primaryTextColor: string
    primaryColor: string
    secondaryColor: string
    highlightColor: string
    secondHighlightColor: string
  }
}


export type IProductType = 'case' | 'pcb' | 'plate' | 'switch' | 'stabilizer' | 'keyset'
export type IProductSize = '7u' | '6.5u' | '2u' | undefined
export type IProductLayout = 'forty_percent' | 'sixty_percent' | 'sixtyfive_percent' | 'seventyfive_percent' | 'tenkeyless' | undefined
export type IStabMount = 'pcb' | 'plate' | undefined

export interface IProductData {
  id: string
  name: string 
  type: IProductType
  size?: IProductSize
  layout?: IProductLayout
  hotswap?: boolean
  mount?: IStabMount
  imgURL: string
  vendors: {
    id: number
    name: string
    logoURL?: string
    vendorURL: string
    productURL: string
    inStock: boolean
    price: string
  }[]
}

export interface IVendor {
  in_stock: boolean
  name: string
  price: number
  product_url: string
  vendor_url: string
}

export interface IProductDatabase {
  [key: number]: IProductData
}