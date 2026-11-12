import fs from 'fs'
import parsing from '../src/parse.js'
import { resolve } from 'node:path'

const readingFile = (file) => {
  const fullPath = resolve(process.cwd(), file)
  const readFile = fs.readFileSync(fullPath, 'utf8')
  return readFile
}

const genDiff = (file1, file2) => {
  const newFile1 = readingFile(file1)
  const newFile2 = readingFile(file2)
  return [parsing(newFile1), parsing(newFile2)]
}

export default genDiff
