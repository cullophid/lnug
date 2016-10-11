// map, filter, reduce

const getPrices = (items) => items.map(item => item.price)

const getItemsInstock = (items) => items.filter(item => item.inStock)

const sum = (numbers) => numbers.reduce((sum, n) => sum + n, 0)
