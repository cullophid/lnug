// composition

// compose :: ((a -> b), (b -> c)) -> (a -> c)
const compose = (f, g) => arg => f(g(arg))


// why?

const last = list => list[list.length -1]

const getQueryString = compose(last, split('?'))
