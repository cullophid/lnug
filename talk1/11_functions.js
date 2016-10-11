
const addVat = n => n * 1.2

const sum = ns => ns.reduce((sum, n) => sum + n, 0)

const getTotalWithVat = (ns) => addVat(sum(ns))

const formatPrice = n => `£${n}GBP`

const getDisplayPrice = ns => formatPrice(getTotalWithVat(ns))
