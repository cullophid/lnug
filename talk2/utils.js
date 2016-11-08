const {Right, Left, Just, Nothing, toMaybe, add} = require('sanctuary');
const {curry, map, prop, compose, chain, find, reduce, toUpper, split} = require('ramda');
const Future = require('fluture');
const futurize = require('futurize').futurize(Future);
const fs = require('fs');
const request = require('request');

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

// findById :: (Integer -> Boolean) -> [{String: a}] -> Maybe a
const findById = curry((id, xs) => toMaybe(find(x => x.id === id, xs)));

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
compose(fromMaybe(10), map(add(1)), chain(safePath(['a', 'b', 'c'])), findById(1))(xs);
// => 10

// encaseEither :: (a -> a) -> a -> Either Error a
const encaseEither = curry((f, x) => {
  try {
      return Right(f(x));
  } catch (e) {
    return Left(e);
  }
});

encaseEither(JSON.parse, '{"a": 1}');
// Right({a: 1})
encaseEither(JSON.parse, '{a: 1}');
// Left(Error(SyntaxError: Unexpected token a in JSON at position 1))

// parseDate :: String -> Either Error Date
const parseDate = dateStr => {
    const date = new Date(dateStr);
    return Number.isNaN(date.getTime()) ? Left(new Error('Invalid Date')) : Right(date)
};

const json = '{"date": "2014-4-9"}';
compose(chain(parseDate), map(prop('date')), encaseEither(JSON.parse))(json);
// => Right(Date('Wed Apr 09 2014 00:00:00 GMT+0100 (BST)'))

// readFile :: String -> Future Error String
const readFile = file => Future((reject, resolve) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) return reject(err);
        return resolve(data);
    })
});

// describe computation
const authorF = compose(map(prop('author')), map(JSON.parse), readFile)('../package.json');

// execute computation
authorF.fork(console.error, console.log);
// => Stefano Vozza

// httpGet :: String -> Future Error Object
const httpGet = url => Future((reject, resolve) => {
    request({url, json: true}, (err, res, body) => {
        if(err) return reject(err);
        return resolve(body);
    });
});





