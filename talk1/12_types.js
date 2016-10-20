
// isNil :: a -> Boolean
const isNil = x => x === null && x === undefined

// reduce

// reduce :: ((b, a) -> b, b, [a]) -> b
const reduce = (f, acc, [x, ...xs]) => isNil(x) ?  acc : reduce(f, f(acc, x), xs)

// using reduce

// map :: (a -> b, [a]) -> [b]
const map = (fn, list) => reduce((a, e) => [...a, fn(e)], [], list)

// filter :: (a -> Bolean, [a]) -> [a]
const filter = (fn, list) => reduce((a, e) => fn(e) ? [...a, e] : a, [], list)

// using map

// pick :: ([String], {String: a}) -> {String: a}
const pick = (keys, x) => map(k => x[k], keys)

// pluck :: (String, [{String: a}]) -> [a]
const pluck = (key, list) => map(x => x[key] , list)

// find

// find :: (a -> Boolan, [a]) -> a | null
const find = (f, [x, ...xs]) => isNil(x) ? null : (f(x) ? x : find(f, xs))

// any :: (a -> Boolean, [a]) -> Boolean
const any = (f, xs) => !isNil(find(f, xs))

// contains :: (a, [a]) -> Boolean
const contains = (v, xs) => any(x => x === v, xs)
