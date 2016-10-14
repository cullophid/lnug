
const compose = (...fns) => fns.reduce((f, g) => arg => f(g(arg)), x => x)

// getDisplayPrice :: [Number] -> String
const getDisplayPrice = compose(formatPrice, addVat, sum)
