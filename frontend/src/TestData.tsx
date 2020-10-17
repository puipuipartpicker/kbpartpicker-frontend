import testResultData from './types/TestData'

const searchResults:testResultData = {
  results: [{
    id: 123,
    name: 'test name',
    productURL: 'https://novelkeys.xyz/collections/frontpage/products/gmk-space-cadet-ii-gb',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: true,
    price: '$45',
    vendor: {name: 'NovelKeys_', url: 'https://novelkeys.xyz/', imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/files/Logo_a8cf9d15-aa0b-42ab-8176-2942f169d7da_720x.png?v=1565381568'}
  }, {
    id: 666,
    name: 'number of the beef',
    productURL: 'https://kbdfans.com/collections/60/products/dz60-60-pcb',
    imgURL: 'https://cdn.shopify.com/s/files/1/3099/8088/products/SpaceCadetII_1080x.png?v=1601649358',
    stock: false,
    price: '$75',
    vendor: {name: 'KBDfans', url: 'https://kbdfans.com/', imgURL: 'https://cdn.shopify.com/s/files/1/1473/3902/files/new-logo_02851fbb-7bd7-46f4-a6ba-86485d041224_200x@2x.png?v=1581588430'}
  }]
}

export default searchResults