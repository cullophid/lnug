
// currying

// add :: (Number, Number) -> Number
const add = (a, b) => a + b

//---

// add :: Number -> Number -> Number
const add = a => b => a + b

//---

add(2)(2) // 4

//---

//increment :: Number -> Number
const increment = add(1)

//decrement :: Number -> Number
const decrement = add(-1)

// incrementAll :: [Number] -> [Number]
const incrementAll = numbers => number.map(add(1))

//---

import curry from 'lodash.curry'

// add : Number -> Number -> Number
const add = curry((a, b) => a + b)

add(1, 2) === add(1)(2) // true
