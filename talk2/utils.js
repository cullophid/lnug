const {Maybe, Just, Nothing, toMaybe, add} = require('sanctuary');
const {curry, map, prop, compose, chain, reduce} = require('ramda');

// safeProp :: String -> {String a} -> Maybe a
const safeProp = curry(compose(toMaybe, prop));

//safePath :: [String] -> {String a} -> Maybe a
const safePath = (path, obj) => reduce((maybeObj, prop) => {
    return chain(safeProp(prop), maybeObj);
}, toMaybe(obj), path);

const obj = {a: {b: {c: 1}}};

// rather than complecting null safety with business logic
let num = 0;
if(obj && obj.a && obj.a.b && obj.a.b.c) { // <= does not compose!
    num = obj.a.b.c + 1
}

// code the happy path instead
map(add(1), safePath(['a', 'b', 'c'], obj));