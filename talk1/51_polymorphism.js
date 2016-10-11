import {calculateTotalPrice} from 'previous-slide'

// priceDetails :: (Number -> Number) -> [Item] -> PriceDetails
const priceDetails = curry((calculateShipping, items) => {
  const totalPrice = calculateTotalPrice(items)
  const shipping = calculateShipping(totalPrice)
  return {
    total,
    shipping,
    grandTotal: totalPrice + shipping
  }
}
