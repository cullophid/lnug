

// composition

// compose :: ((a -> b), (b -> c)) -> (a -> c)
const compose = (f, g) => arg => f(g(arg))


// why?

// getTotalWithVat :: [Number] -> Number
const getTotalWithVat = compose(addVat, sum)

// getDisplayPrice :: [Number] -> String
const getDisplayPrice = compose(formatPrice, getTotalWithVat)
