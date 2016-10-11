

// composition

const compose = (f, g) => arg => f(g(arg))


// why?

const getItemsInstockPrices = compose(getPrices, getItemsInstock)

const getTotal = compose(sum, getItemsInstockPrices)

//

const getTotal = compose(compose(sum, getPrices), getItemsInstock)
