

// split :: (String | Regex, String) -> [String]
const split = (separator, string) => string.split(separator)

// split :: String | Regex -> String -> [String]
const split = separator => string) => string.split(separator)

//---

// splitQueryString :: String -> [String]
const splitQueryString = split('&')

// splitQueryPairs :: [String] -> [[String, String]]
const splitQueryPairs = pairs => map(split('='), pairs)

//---

// map :: (a -> b) -> [a] -> [b]
const map = f => xs => reduce((acc, x) => [...acc, f(x)], [], xs)

// splitQueryPairs :: [String] -> [[String, String]]
const splitQueryPairs = map(split('='))

//---

const [baseUrl, queryString] = split('?')(url)


// ---

const split = curry((separator, string) => string.split(separator))


assert.DeepEqual(split('?', url), split('?')(url))


//implementation
const {curry} = require('ramda')
