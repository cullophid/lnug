
const compose2 = (f, g) => arg => f(g(arg))
const compose = (...fns) => fns.reduce(compose2, x => x)

// getDisplayPrice :: [Number] -> String
const getDisplayPrice = compose(formatPrice, addVat, sum)
