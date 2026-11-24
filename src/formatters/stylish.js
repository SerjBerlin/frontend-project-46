import _ from 'lodash'

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }
  else {
    const arr = Object.entries(value)
    const mappedArr = arr.map(([key, val]) => `${' '.repeat((depth + 1) * 4)}${key}: ${stringify(val, depth + 1)}`).join('\n')
    return `{\n${mappedArr}\n${' '.repeat(depth * 4)}}`
  }
}

const stylish = (tree) => {
  const iter = (nodes, depth = 1) => {
    const newTree = nodes.map((node) => {
      switch (node.type) {
        case 'added':
          return `${' '.repeat((depth * 4) - 2)}+ ${node.key}: ${stringify(node.value, depth)}`
        case 'deleted':
          return `${' '.repeat((depth * 4) - 2)}- ${node.key}: ${stringify(node.value, depth)}`
        case 'nested':
          return `${' '.repeat(depth * 4)}${node.key}: {\n${iter(node.children, depth + 1)}\n${' '.repeat(depth * 4)}}`
        case 'changed':
          return `${' '.repeat((depth * 4) - 2)}- ${node.key}: ${stringify(node.value1, depth)}\n${' '.repeat((depth * 4) - 2)}+ ${node.key}: ${stringify(node.value2, depth)}`
        case 'unchanged':
          return `${' '.repeat((depth * 4))}${node.key}: ${stringify(node.value, depth)}`
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    }).join('\n')
    return newTree
  }
  return `{\n${iter(tree)}\n}`
}

export default stylish
