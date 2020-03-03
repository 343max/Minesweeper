import {
  emptyField,
  FieldState,
  generateBombField,
  getAdjacentBombCount,
  getAdjacentPatches,
  getFieldSize,
  getVisibleField,
  getVisiblePatch,
  getVisiblePatchForBombCount,
  VisibleField,
  VisiblePatch,
  BoolField
} from "../src/model/Field"

test("should generate an empty filed", () => {
  const field = emptyField({ width: 2, height: 3 })
  const expectedField: BoolField = [
    [false, false, false],
    [false, false, false]
  ]

  expect(field).toStrictEqual(expectedField)
})

test("should generate a bomb field", () => {
  const field = generateBombField({ width: 2, height: 3 }, 5, { x: 1, y: 2 })

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

test("should get Empty Patch", () => {
  const patch = getVisiblePatchForBombCount(0)
  expect(patch).toBe(VisiblePatch.Empty)
})

test("should get AdjacentBomb1", () => {
  const patch = getVisiblePatchForBombCount(1)
  expect(patch).toBe(VisiblePatch.AdjacentBomb1)
})

test("should get AdjacentBomb7", () => {
  const patch = getVisiblePatchForBombCount(7)
  expect(patch).toBe(VisiblePatch.AdjacentBomb7)
})

test("should show grass", () => {
  const field: FieldState = {
    bombs: [[false]],
    flags: [[false]],
    revealed: [[false]]
  }
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Grass)
})

test("should show grass for unrevealed bomb", () => {
  const field: FieldState = {
    bombs: [[true]],
    flags: [[false]],
    revealed: [[false]]
  }
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Grass)
})

test("should show empty", () => {
  const field: FieldState = {
    bombs: [[false]],
    flags: [[false]],
    revealed: [[true]]
  }
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Empty)
})

test("should show flag", () => {
  const field: FieldState = {
    bombs: [[false]],
    flags: [[true]],
    revealed: [[false]]
  }
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Flag)
})

test("should show flag for marekd bomb", () => {
  const field: FieldState = {
    bombs: [[true]],
    flags: [[true]],
    revealed: [[false]]
  }
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Flag)
})

test("should show bomb", () => {
  const field: FieldState = {
    bombs: [[true]],
    flags: [[false]],
    revealed: [[true]]
  }
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Bomb)
})

test("should show nearby count for empty revealed", () => {
  const field: FieldState = {
    bombs: [[false, true]],
    flags: [[false, false]],
    revealed: [[true, false]]
  }
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.AdjacentBomb1)
})

test("should show grass for empty un-revealed", () => {
  const field: FieldState = {
    bombs: [[false, true]],
    flags: [[false, false]],
    revealed: [[false, false]]
  }
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Grass)
})

test("should generate a visible field", () => {
  const field: FieldState = {
    bombs: [
      [true, true],
      [false, false]
    ],
    flags: [
      [true, false],
      [false, false]
    ],
    revealed: [
      [false, false],
      [true, true]
    ]
  }

  const visibleField = getVisibleField(field)
  const expectedVisibleField: VisibleField = [
    [VisiblePatch.Flag, VisiblePatch.Grass],
    [VisiblePatch.AdjacentBomb2, VisiblePatch.AdjacentBomb2]
  ]

  expect(visibleField).toStrictEqual(expectedVisibleField)
})
