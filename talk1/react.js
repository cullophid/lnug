import {createElement} from 'react'
import {curry} from 'ramda'

const node = curry((name, props, children) => createElement(tag, props, children)

const DIV = node('div')

export default ({}) => {
  return DIV({className: 'container-fluid'}, [
    DIV({className: 'col-xs-6 col-sm4'}, [
      FORM({}, [

      ])
    ])
    DIV({className: 'col-xs-6 col-sm4'}, [

    ])
  ])
}


DIV class: 'container-fluid', [
  DIV class: 'col-xs-6', [

  ]
]
