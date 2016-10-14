
// addVat :: Number -> Number
const addVat = n => n * 1.2

// add :: (Number, Number) -> Number
const add = (a, b) => a + b

// sum :: [Number] -> Number
const sum = ns => ns.reduce((sum, n) => sum + n, 0)

// totalWithVat :: [Number] -> Number
const getTotalWithVat = (ns) => addVat(sum(ns))

// formatPrice :: Number -> String
const formatPrice = n => `£${n}GBP`

// getDisplayPrice :: [Number] -> String
const getDisplayPrice = ns => formatPrice(getTotalWithVat(ns))


// head :: [a] -> a
const head = ([head]) => head

// tail :: [a] -> [a]
const tail = ([_, ...tail]) => tail
