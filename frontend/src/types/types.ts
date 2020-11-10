export type Themes = 'theme1'|'theme2'|'theme3'|'theme4'|'theme5'|'theme6'|'default'

export interface ThemeVariableValues {
  theme1: {
    primaryColor: string
  }
  theme2: {
    primaryColor: string
  }
  theme3: {
    primaryColor: string
  }
  theme4: {
    primaryColor: string
  }
  theme5: {
    primaryColor: string
  }
  theme6: {
    primaryColor: string
  }
}


export type IProductType = 'case' | 'pcb' | 'plate' | 'switch' | 'stabilizers' | 'keycaps'
export type IProductSize = '7u' | '6.5u' | '2u'
export type IProductLayout = 'forty_percent' | 'sixty_percent' | 'sixtyfive_percent' | 'seventyfive_percent' | 'tenkeyless'
export type IStabMount = 'pcb' | 'plate'

export interface IProductData {
  name: string 
  type: IProductType
  size?: IProductSize
  layout?: IProductLayout
  hotswap?: boolean
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

export interface IPriductDatabase {
  [key: number]: IProductData
}