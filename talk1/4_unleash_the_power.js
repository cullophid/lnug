
// multiply :: Number -> Number -> Number
const multiply = curry((a, b) => a * b)

// pick :: [String] -> {String: a} -> [a]
const pick = (keys, object) => map(k => object[k], keys)

// prop :: String -> {String: a} -> a
const prop = curry((key, object) => object[key])

// product :: [Number] -> Number
const product = reduce(multiply, 1)

// itemPrice :: [{qty: Number, price: Number}] -> Number
const itemPrice = compose(product, pick(['qty', 'price']))

// totalPriceIncVat :: [{qty: Number, price: Number, inStock: Boolean}] -> Number
const totalPrice = compose(sum, map(itemPrice), filter(prop('inStock'))
