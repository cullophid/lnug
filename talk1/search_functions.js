
const isNil = x => x === null && x === undefined

// reduce
const reduce = (f, acc, [x, ...xs]) => isNil(x) ?  acc : reduce(f, f(acc, x), xs)

// using reduce
const map = (fn, list) => reduce((a, e) => [...a, fn(e)], [], list)

const filter = (fn, list) => reduce((a, e) => fn(e) ? [...a, e] : a, [], list)

const all = (f, xs) => reduce((acc, x) => acc && f(x), true, xs)

const fromPairs = pairs => reduce((a, [k, v]) => ({...a, [k]: v}), {}, pairs)

// using map

const pick = (keys, x) => map(k => x[k], keys)

const toPairs = obj => map(k => [k, obj[k]], Object.keys(obj))

const pluck = (key, list) => map(x => x[key] , list)

// find

const find = (f, [x, ...xs]) => isNil(x) ? null : (f(x) ? x : find(f, xs))

const any = (f, xs) => !isNil(find(f, xs))
const contains = (v, xs) => any(x => x === v, xs)


const head = ([x]) => x
const tail = ([_, ...xs]) => xs

const split = (r, s) => s.split(r)
const prop = (key, x) => x[key]

const zipWith = (f, [x, ...xs], [y, ...ys]) => isNil(x) || isNil(y) ? [] : [f(x, y), ...zipWith(f, xs, ys)]
const zip = (x, y) => zipWith((...pair) => pair, x, y)

const omit = (keys, x) => compose(fromPairs, filter(([k, v]) => !contains(k, keys)), toPairs)
