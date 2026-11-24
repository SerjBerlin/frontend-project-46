import plain from '../formatters/plain.js'
import stylish from '../formatters/stylish.js'
import json from '../formatters/json.js'

const format = {
  stylish: stylish,
  plain: plain,
  json: json,
}

const formatter = (tree, formatName) => {
  if (!Object.hasOwn(format, formatName)) {
    throw new Error ('invalid format')
  }
  return format[formatName](tree)
}

export default formatter
