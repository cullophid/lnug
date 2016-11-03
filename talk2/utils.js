const {Maybe, Just, Nothing, toMaybe, add} = require('sanctuary');
const {curry, map, prop, compose, chain, find, reduce, toUpper} = require('ramda');

// safeProp :: String -> {String: a} -> Maybe a
const safeProp = curry(compose(toMaybe, prop));

let obj = {a: 'abc'};

map(toUpper, toMaybe(prop('a', obj)));   // => Just('ABC')
map(toUpper, toMaybe(prop('b', obj)));   // => Nothing()
//toUpper(prop('b', obj));  // => TypeError

obj = {a: {b: {c: 9}}};

// no chain
compose(map(safeProp('c')), map(safeProp('b')), safeProp('a'));
// => Just(Nothing()) wtf?
compose(map(map(safeProp('c'))), map(safeProp('b')), safeProp('a'));
// => Just(Just(Just(9))) err...

//chain
compose(chain(safeProp('c')), chain(safeProp('b')), safeProp('a'))(obj);

safeProp('a')(obj); // => Just({b: {c: 9}})

map(safeProp('b'), Just({b: {c: 9}})); // => Just(Just({c: 9}))
chain(safeProp('b'), Just({b: {c: 9}})); // => Just({c: 9})

map(safeProp('c'), Just(Just({c: 9}))); // => Just(Nothing())
chain(safeProp('c'), Just({c: 9})); // => Just(9)

// fromMaybe :: a -> Maybe a -> a
const fromMaybe = curry((def, m) => m.isJust ? m.value : def);

fromMaybe(2, Just(1)); // => 1
fromMaybe(2, Nothing()); // => 2

// safeFind :: (a -> Boolean) -> [a] -> Maybe a
const safeFind = curry(compose(toMaybe, find));

//safePath :: [String] -> {String: a} -> Maybe a
const safePath = curry((path, obj) => reduce((maybe, prop) => {
    return chain(safeProp(prop), maybe);
}, toMaybe(obj), path));

const xs = [
    {id: 1, a: {b: 1}},
    {id: 2, a: 4},
    {id: 3, d: 9},
    {id: 4, a: {b: {c: 9}}}
];

// rather than complecting null safety with business logic
obj = find(x => x.id === 1, xs);
let num;
if(obj && obj.a && obj.a.b) { // <= does not compose!
    num = (obj.a.b.c  + 1) || 10
}

// code the happy path instead
compose(fromMaybe(10), map(add(1)), chain(safePath(['a', 'b', 'c'])), safeFind(x => x.id === 1))(xs);
// => 10

