const reduce = (fn, acc, list) => list.reduce(fn, acc)

const filter = (fn, list) => reduce((a, e) => fn(e) ? [...a, e] : a, [], list)
const map = (fn, list) => reduce((a, e) => [...a, fn(e)], [], list)
const compose = (...fns) => reduce((a, e) => arg => a(e(arg)), x => x, fns)

const append = postfix => str => str + postfix

console.log(compose(append('mr'), append('hello'))('andreas'))
