import { load } from 'js-yaml'

const parsers = {
  '.json': JSON.parse,
  '.yml': load,
  '.yaml': load,
}

export default function parsing(text, end) {
  const fn = parsers[end]
  const result = fn(text)
  return result
}
