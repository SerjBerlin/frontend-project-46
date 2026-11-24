import fs from 'fs'
import parsing from '../src/parse.js'
import { resolve, extname } from 'node:path'
import _ from 'lodash'
import formatter from '../src/formatters/index.js'

const readingFile = (file) => {
  const fullPath = resolve(process.cwd(), file)
  const readFile = fs.readFileSync(fullPath, 'utf8')
  return readFile
}

const endFile = file => extname(file)

const buildDiff = (data1, data2) => {
  const onlyKeys1 = Object.keys(data1)
  const onlyKeys2 = Object.keys(data2)
  const sortedUniqueValues = _.sortBy(_.union(onlyKeys1, onlyKeys2))
  return sortedUniqueValues.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] }
    }
    else if (!Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value: data1[key] }
    }
    else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) }
    }
    else if (data1[key] !== data2[key]) {
      return { key, type: 'changed', value1: data1[key], value2: data2[key] }
    }

    return { key, type: 'unchanged', value: data1[key] }
  })
}

const genDiff = (file1, file2, format = 'stylish') => {
  const endOfFile1 = endFile(file1)
  const endOfFile2 = endFile(file2)
  const newFile1 = readingFile(file1)
  const newFile2 = readingFile(file2)
  const parsingFile1 = parsing(newFile1, endOfFile1)
  const parsingFile2 = parsing(newFile2, endOfFile2)
  const arrOfKeysValues = buildDiff(parsingFile1, parsingFile2)
  return formatter(arrOfKeysValues, format)
}

export default genDiff
