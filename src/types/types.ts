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
export type IStabMount = 'pcb' | 'plate' | undefined
export type ISwitchType = 'linear' | 'tactile' | 'clicky'
export type ISwitchProfile = 'low' | 'medium' | 'high'
export type IStabilizerType = 'pcb_screw_in' | 'pcb_snap_in' | 'plate_mount'
export type IStabilizerSize = 'six_point_25_u' | 'seven_u' | 'two_u' | 'full_kit' | 'sixty_kit'
export type IKeyboardFormFactor = 'forty_percent' | 'fifty_percent' | 'sixty_percent'| 'sixtyfive_percent' | 'tenkeyless' | 'frowless' | 'full_size'
export type IKeyboardLayout = 'ansi' | 'iso' | 'tsangan'

export interface IProductData {
  id: number
  img_url: string
  name: string
  hotswap: boolean
  product_type: IProductType
  switch_type: ISwitchType
  switch_profile: ISwitchProfile
  stabilizer_type: IStabilizerType
  stabilizer_size: IStabilizerSize
  keyboard_form_factor: IKeyboardFormFactor
  keyboard_layout: IKeyboardLayout
  vendors: IVendor[]
}


export interface IVendor {
  id: number
  name: string
  in_stock: boolean
  price: number
  product_id: number
  url: string
  vendor_id: string
}

export interface IProductDatabase {
  [key: number]: IProductData
}
