// map, filter, reduce
const items = [
  { name: 'hat', qty: 1 price: 10, inStock: true },
  { name: 'cat', qty: 2 price: 20, inStock: false },
  { name: 'car', qty: 3 price: 30, inStock: true },
  { name: 'lsd', qty: 4 price: 40, inStock: false }
]

const itemsInStock = items.filter(item => item.inStock) // [{name: 'hat'...

const quantities = itemsInStock.map(item => item.qty) // [1, 3]

const totalItems = quantities.reduce((sum, n) => sum + n), 0) // 4
