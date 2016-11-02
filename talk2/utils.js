const {Maybe, Just, Nothing, toMaybe, add} = require('sanctuary');
const {curry, map, prop, compose, chain, find, reduce, toUpper} = require('ramda');

// safeProp :: String -> {String: a} -> Maybe a
const safeProp = curry(compose(toMaybe, prop));

let obj = {a: 'abc'};

map(toUpper, toMaybe(prop('a', obj)));   // => Just(‘ABC’)
map(toUpper, toMaybe(prop('b', obj)));   // => Nothing()
//toUpper(prop('b', obj));  // => TypeError

obj = {a: {b: {c: 9}}};

// no chain
compose(map(map(safeProp('c'))), map(safeProp('b')), safeProp('a'))(obj);
// => Just(Just(Just(9))) wtf?

//chain
compose(chain(safeProp('c')), chain(safeProp('b')), safeProp('a'))(obj);
// => Just(9)

// safeFind :: (a -> Boolean) -> [a] -> Maybe a
const safeFind = curry(compose(toMaybe, find));

//safePath :: [String] -> {String: a} -> Maybe a
const safePath = curry((path, obj) => reduce((maybeObj, prop) => {
    return chain(safeProp(prop), maybeObj);
}, toMaybe(obj), path));

const xs = [
    {id: 1, a: {b: 1}},
    {id: 2, a: 4},
    {id: 3, d: 9},
    {id: 4, a: {b: {c: 9}}}
];

// rather than complecting null safety with business logic
obj = find(x => x === 1, xs);
let num = 0;
if(obj && obj.a && obj.a.b && obj.a.b.c) { // <= does not compose!
    num = obj.a.b.c + 1
}

// code the happy path instead
compose(map(add(1)), chain(safePath(['a', 'b', 'c'])), safeFind(x => x === 1))(xs);
