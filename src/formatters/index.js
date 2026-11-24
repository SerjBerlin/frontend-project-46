import plain from '../formatters/plain.js'
import stylish from '../formatters/stylish.js'
import json from '../formatters/json.js'

const format = {
  stylish: stylish,
  plain: plain,
  json: json,
}

const formatter = (tree, form) => {
  if (!Object.hasOwn(format, form)) {
    throw new Error ('invalid format')
  }
  return format[form](tree)
}

export default formatter
