
// addVat :: Number -> Number
const addVat = n => n * 1.2

// sum :: [Number] -> Number
const sum = ns => ns.reduce((sum, n) => sum + n, 0)

// totalWithVat :: [Number] -> Number
const getTotalWithVat = (ns) => addVat(sum(ns))

// formatPrice :: Number -> String
const formatPrice = n => `£${n}GBP`

// getDisplayPrice :: [Number] -> String
const getDisplayPrice = ns => formatPrice(getTotalWithVat(ns))


// head :: [a] -> a
const head = (list) => list[0]
