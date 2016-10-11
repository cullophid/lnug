// map :: (a -> b) -> [a] -> [b]
const map = curry((fn, list) => list.map(fn))

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = curry((fn, list) => list.filter(fn))

// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce = curry(fn, acc) => list => list.reduce(fn, acc))

// incrementAll :: [Number] -> [Number]
const incrementAll = map(add(1))

// prop :: String -> {String:a} -> a | null
const prop = curry((key, object) => object[key])

// getPrices :: [{price: a}] -> [a]
const getPrices = (items) => items.map(item => item.price)
const getPrices = map(prop('price'))

// getItemsInstock :: [{inStock: Boolean}] -> [{inStock: Boolean}]
const getItemsInstock = (items) => items.filter(item => item.inStock)
const getItemsInstock = filter(prop('inStock'))

// sum :: [Number] -> Number
const sum = (numbers) => numbers.reduce((sum, n) => sum + n, 0)
const sum = reduce((a, b) => a + b, 0)
