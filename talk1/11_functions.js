
const addVat = n => n * 1.2

const add = (a, b) => a + b

const sum = ns => ns.reduce(add, 0)

const getTotalWithVat = (ns) => addVat(sum(ns))

const formatPrice = n => `£${n}GBP`

const getDisplayPrice = ns => formatPrice(getTotalWithVat(ns))



cosnt getDisplayPrice = (ns) => {
  let sum = 0;
  for (let i = 0; i < ns.length; i++ ) {
    sum += ns[i]
  }
  let sumWithVat = sum * 1.2
  return `£${sumWithVat}GBP`
}
