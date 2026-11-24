import { expect, test } from 'vitest'
import genDiff from '../src/index.js'
import path from 'path'
import fs from 'fs'

const getFixturePath = filename => path.join(import.meta.dirname, '..', '__fixtures__', filename)
const readFile = file => fs.readFileSync(getFixturePath(file), 'utf-8').trim()

const extensions = ['json', 'yaml', 'yml']
const expectedStylish = readFile('result.txt')
const expectedPlain = readFile('resultForPlain.txt')
const expectedJson = readFile('resultForJson.txt')

test.each(extensions)('genDiff for %s', (ext) => {
  const file1 = getFixturePath(`file1.${ext}`)
  const file2 = getFixturePath(`file2.${ext}`)

  expect(genDiff(file1, file2)).toBe(expectedStylish)
  expect(genDiff(file1, file2, 'stylish')).toBe(expectedStylish)
  expect(genDiff(file1, file2, 'plain')).toBe(expectedPlain)
  expect(genDiff(file1, file2, 'json')).toBe(expectedJson)
  expect(() => genDiff(file1, file2, 'lala')).toThrow('invalid format')
})
