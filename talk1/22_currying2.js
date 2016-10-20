
// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce = curry((f, acc, [x, ...xs]) => isNil(x) ?  acc : reduce(f, f(acc, x), xs))

// map :: (a -> b) -> [a] -> [b]
const map = curry((fn, list) => reduce((a, e) => [...a, fn(e)], [], list))

// filter :: (a -> Bolean) -> [a] -> [a]
const filter = curry((fn, list) => reduce((a, e) => fn(e) ? [...a, e] : a, [], list))

// pick :: [String] -> {String: a} -> {String: a}
const pick = curry((keys, x) => map(k => x[k], keys))

// pluck :: String -> [{String: a}] -> [a]
const pluck = curry((key, list) => map(x => x[key] , list))

// find :: (a -> Boolan) -> [a] -> a | null
const find = curry((f, [x, ...xs]) => isNil(x) ? null : (f(x) ? x : find(f, xs)))

// any :: (a -> Boolean) -> [a] -> Boolean
const any = curry((f, xs) => !isNil(find(f, xs)))

// contains :: a -> [a] -> Boolean
const contains = curry((v, xs) => any(x => x === v, xs))
