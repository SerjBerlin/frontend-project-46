import { load } from 'js-yaml'

export default function parsing(text, end) {
  switch (end) {
    case '.json':
      return JSON.parse(text)
    case '.yml':
      return load(text)
    case '.yaml':
      return load(text)
    default:
      throw new Error (`uncorrect format file: ${end}`)
  }
}
