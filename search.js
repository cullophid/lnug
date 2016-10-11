import {productSearch} from 'productSearch'
import {map, chain} from 'ramda'

const buildSearchQuery = urlQuery => {
  return {
    bool: {
        match_all: {}
    }
  }
}

const searchProducts = compose(productSearch, buildSearchQuery)


const getProductIds = compose(pluck('product_id'), path(['hits', 'buckets']))
const fetchProducts = searchResults => compose(map(products => ({products, searchresults})), fetchProducts, getProductIds)

const createProductMap = reduce((a, e) => ({a, [e.id] : e}), {})
const addProductInfo = curry((productMap, {product_id}) => productMap[product_id])
const buildSearchResults = ({searchResults, products}) => {
  return {
    filters:
    results: map(addProductInfo(createProductMap(products)))
    total_search
  }
}k


export default compose(map(buildSearchResults), chain(fetchProducts), searchProducts)
