
const range = (start, end) => {
  const result = [];
  for(let i = start; i <= end; i ++) {
    result.push(i)
  }
  return result
}

range(3, 5) // [3, 4, 5]


const leftPad = (spacer, indent, str) => {
    return range(1, indent).map(() => spacer).join('') + str
}

const loadingBar = (total, current) => leftPad('=', (current/total * 100), '>')


const cristmas = height => {
  return range(1, height)
    .map(i => leftPad(' ', (height - i), leftPad('*', (i * 2 - 1), '')))
    .join('\n')
}



/**********/

// stateless

/**********/

// NO!
const addToList = (list) => [...list, ++counter]

// AWESOME!
const addToList = (e, list) => [e, ...list]

/**********/



//immutability
//once an object is created it cannot be changed


/**********/



//immutability
//once an object is created we promise not to change it


/**********/

// instead of
user.email = 'andreas@example.com'

// use
let userWithEmail = {...user, email: 'andreas@example.com'}


/**********/

//NO!
const addToList = (e, list) => list.push(e)

//WINNING!!!
const addToList = (e, list) => [...list, e]



// curry



/**********/


// turning this
const add = (a, b) => a + b

// into this
const add = a => b => a + b


const increment = add(1)
const decrement = add(-1)


const three = add(1)(2)


// autocurry
const curry = (fn) => {
  // ...
}


/**********/


// autocurry
const curry = (fn) => {
  return require('lodash.curry')(fn)
}


/**********/

//utils
const split = curry((separator, string) => string.split(separator))

const prop = curry((prop, obj) => obj[prop])

const map = curry((fn, list) => list.map(fn))

const filter = curry((fn, list) => list.filter(fn))

const reduce = curry((fn, acc, list) => list.reduce(fn, acc))



const sum = reduce(add, 0)

const max = reduce(Math.max, -infinity)

const min = reduce(Math.min, infinity)

const fromPairs = reduce((acc, [key, value]) => ({...acc, [key]: value}), {})




// compose




/**********/



const compose = (f, g) => (...args) => f(g(...args))




/**********/


const totalPrice = compose(sum, map(prop('price')))

const lowestPrice = compose(min, map(prop('price'))

const lowestPriceInstock = compose(lowestPrice, filter(prop('inStock')))


/*********/


// Data last

//AWKWARD!
const map = curry((list, fn) => list.map(fn))

// THE BOLLOCKS
const map = curry((fn, list) => list.map(fn))


/**********/


// what can we do now?


/**********/

const parseQuery = compose(fromPairs, compose(map(split('=')), split('&')))

/**********/
