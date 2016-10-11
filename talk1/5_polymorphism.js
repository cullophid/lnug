import {totalPrice} from 'previous-slide'

const priceDetails = curry((calculateShipping, items) => {
  const totalPrice = calculateTotalPrice(items)
  const shipping = calculateShipping(totalPrice)
  return {
    total,
    shipping,
    grandTotal: totalPrice + shipping
  }
}
