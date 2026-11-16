import fs from 'fs'
import parsing from '../src/parse.js'
import { resolve, extname } from 'node:path'
import _ from 'lodash'

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
      return `  + ${key}: ${data2[key]}`
    }
    else if (!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${data1[key]}`
    }
    else if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`
    }

    return `    ${key}: ${data1[key]}`
  }).join('\n')
}

const genDiff = (file1, file2) => {
  const endOfFile1 = endFile(file1)
  const endOfFile2 = endFile(file2)
  const newFile1 = readingFile(file1)
  const newFile2 = readingFile(file2)
  const parsingFile1 = parsing(newFile1, endOfFile1)
  const parsingFile2 = parsing(newFile2, endOfFile2)
  const arrOfKeysValues = buildDiff(parsingFile1, parsingFile2)
  return `{\n${arrOfKeysValues}\n}`
}

export default genDiff
