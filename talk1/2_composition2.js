
const compose2 = (f, g) => (...args) => f(g(...args))
export const compose = (...fns) => fns.reduce(compose2, x => x)

const getTotal = compose(sum, getPrices, getItemsInstock)
