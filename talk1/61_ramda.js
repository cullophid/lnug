import { sum, compose, map, prop, filter} from 'ramda'

const getTotalItems = compose(sum, map(prop('qty')), filter(prop('inStock')))


const getTotalItems = _.compose(_.sum, _.partial(_.map, _, _.partial(_.get, _, 'qty')), _.partial(_.filter, _, _.partial(_.get, _, 'price')))
