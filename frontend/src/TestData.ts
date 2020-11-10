import { IProductData, IPriductDatabase } from './types/types'

export const searchResults = [{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  },{
    id: 123,
    name: 'test name',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    priceRange: '$45 ~ $48',
    vendor: {
      name: 'NovelKeys_', 
      url: 'https://novelkeys.xyz/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    stock: false,
    priceRange: '$75 ~ $110',
    vendor: {
      name: 'KBDfans', 
      url: 'https://kbdfans.com/', 
      imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  }]


export const ProductTestData: IPriductDatabase = {
  123: {
    name: 'test name',
    type: 'case',
    layout: 'sixty_percent',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1024x1024@2x.png?v=1601649358',
    vendors: [{
      id: 12345,
      name: 'NovelKeys_',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://novelkeys.xyz/',
      productURL: 'https://novelkeys.xyz/collections/frontpage/products/gmk-space-cadet-ii-gb',
      inStock: true,
      price: '$120'
    }, {
      id: 6666,
      name: 'KBDfans',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://kbdfans.com/',
      productURL: 'https://kbdfans.com/collections/keycaps/products/gb-epbt-skadi-1',
      inStock: true,
      price: '$92'
    }, {
      id: 2121,
      name: 'PIMP MY KEYBOARD',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://pimpmykeyboard.com/',
      productURL: 'https://cdn10.bigcommerce.com/s-ktpi93fl/products/215/images/2068/GRANITE__46110.1571872160.1280.1280.jpg?c=2',
      inStock: true,
      price: '$79'
    },{
      id: 6666,
      name: 'KBDfans',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://kbdfans.com/',
      productURL: 'https://kbdfans.com/collections/keycaps/products/gb-epbt-skadi-1',
      inStock: true,
      price: '$92'
    }, {
      id: 2121,
      name: 'PIMP MY KEYBOARD',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://pimpmykeyboard.com/',
      productURL: 'https://cdn10.bigcommerce.com/s-ktpi93fl/products/215/images/2068/GRANITE__46110.1571872160.1280.1280.jpg?c=2',
      inStock: true,
      price: '$79'
    }]
  } ,   
  666: {
    name: 'test name2',
    type: 'pcb',
    layout: 'sixty_percent',
    hotswap: true,
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/NK65PCB-Front_1024x1024@2x.png?v=1596543025',
    vendors: [{
      id: 12345,
      name: 'NovelKeys_',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://novelkeys.xyz/',
      productURL: 'https://novelkeys.xyz/collections/diy-kits/products/nk65-pcb',
      inStock: true,
      price: '$50'
    }, {
      id: 6666,
      name: 'KBDfans',
      logoURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568',
      vendorURL: 'https://kbdfans.com/',
      productURL: 'https://kbdfans.com/collections/65/products/dz68rgb-hot-swap-rgb-pcb',
      inStock: false,
      price: '$58'
    }]
  }
}