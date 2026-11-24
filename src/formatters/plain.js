import _ from 'lodash'

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
  }
  else if (_.isObject(value)) {
    return '[complex value]'
  }
  else {
    return value
  }
}

const plain = (tree) => {
  const iter = (nodes, keys = '') => {
    const newTree = nodes.map((node) => {
      const key = keys === '' ? node.key : `${keys}.${node.key}`
      switch (node.type) {
        case 'deleted':
          return `Property '${key}' was removed`
        case 'changed':
          return `Property '${key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`
        case 'added':
          return `Property '${key}' was added with value: ${stringify(node.value)}`
        case 'nested':
          return iter(node.value, key)
        case 'unchanged':
          return null
      }
    })
      .filter(Boolean)
      .join('\n')
    return newTree
  }
  return iter(tree)
}

export default plain
