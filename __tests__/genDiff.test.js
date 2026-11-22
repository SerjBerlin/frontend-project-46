import { expect, test } from 'vitest'
import genDiff from '../src/index.js'
import path from 'path'
import fs from 'fs'

const getFixturePath = filename => path.join(import.meta.dirname, '..', '__fixtures__', filename)
const readFile = file => fs.readFileSync(getFixturePath(file), 'utf-8')

test ('genDiff for json with stylish', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const result = readFile('result.txt').trim()
  expect(genDiff(file1, file2)).toBe(result)
})

test ('genDiff for yaml with stylish', () => {
  const file1 = getFixturePath('file1.yaml')
  const file2 = getFixturePath('file2.yaml')
  const result = readFile('result.txt').trim()
  expect(genDiff(file1, file2)).toBe(result)
})

test ('genDiff for yml with stylish', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const result = readFile('result.txt').trim()
  expect(genDiff(file1, file2)).toBe(result)
})
