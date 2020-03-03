import {
  generateBombField,
  getAdjacentPatches,
  getAdjacentBombCount,
  getFieldSize
} from "../src/model/Field"

test("should generate a bomb field", () => {
  const field = generateBombField({ width: 2, height: 3 }, 5, { x: 1, y: 2 })

  console.log(field)

  expect(field.length).toBe(2)

  field.forEach(row => {
    expect(row.length).toBe(3)
  })

  const bombCount = field.reduce((count, row) => {
    return row.reduce((count, patch) => {
      return count + (patch ? 1 : 0)
    }, count)
  }, 0)
  expect(bombCount).toBe(5)

  expect(field[1][2]).toBe(false)
})

test("should have no adjacent patches", () => {
  const patches = getAdjacentPatches({ width: 1, height: 1 }, { x: 0, y: 0 })
  expect(patches).toEqual([])
})

test("should messure a generated field size correctly", () => {
  const field = generateBombField({ width: 5, height: 3 }, 0, { x: 0, y: 0 })
  const size = getFieldSize(field)
  expect(size).toEqual({ width: 5, height: 3 })
})

test("should correctly messure an empty field", () => {
  const size = getFieldSize([])
  expect(size).toEqual({ width: 0, height: 0 })
})

test("should have 8 adjacent patches", () => {
  const patches = getAdjacentPatches({ width: 3, height: 3 }, { x: 1, y: 1 })
  expect(patches).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    // center patch
    { x: 1, y: 2 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 }
  ])
})

test("should check nearby for empty", () => {
  const count = getAdjacentBombCount(
    [
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ],
    { x: 1, y: 1 }
  )
  expect(count).toBe(0)
})

test("should check nearby for bombs", () => {
  const count = getAdjacentBombCount(
    [
      [true, true, true],
      [true, false, true],
      [true, true, true]
    ],
    { x: 1, y: 1 }
  )
  expect(count).toBe(8)
})
