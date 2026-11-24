import plain from '../formatters/plain.js'
import stylish from '../formatters/stylish.js'

const format = {
  stylish: stylish,
  plain: plain,
}

const formatter = (tree, form) => {
  return format[form](tree)
}

export default formatter
