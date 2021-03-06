
const isNil = x => x === null && x === undefined

// reduce

const reduce = (f, acc, [x, ...xs]) => isNil(x) ?  acc : reduce(f, f(acc, x), xs)

// using reduce

const map = (fn, list) => reduce((a, e) => [...a, fn(e)], [], list)

const filter = (fn, list) => reduce((a, e) => fn(e) ? [...a, e] : a, [], list)

// using map

const pick = (keys, x) => map(k => x[k], keys)

const pluck = (key, list) => map(x => x[key] , list)

// find

const find = (f, [x, ...xs]) => isNil(x) ? null : (f(x) ? x : find(f, xs))

const any = (f, xs) => !isNil(find(f, xs))

const contains = (v, xs) => any(x => x === v, xs)
