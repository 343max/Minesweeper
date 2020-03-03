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
  BoolField,
  Patch,
  FieldSize
} from "../src/model/Field"

function f(isBomb: number, isFlagged: number, isRevealed: number): Patch {
  return {
    isBomb: isBomb == 1,
    isFlagged: isFlagged == 1,
    isRevealed: isRevealed == 1
  }
}

test("should generate a patch", () => {
  const patch = f(0, 1, 1)
  expect(f(0, 1, 1)).toStrictEqual({
    isBomb: false,
    isFlagged: true,
    isRevealed: true
  })
})

test("should generate an empty filed", () => {
  const field = emptyField({ width: 2, height: 3 })
  const expectedField: FieldState = [
    [f(0, 0, 0), f(0, 0, 0), f(0, 0, 0)],
    [f(0, 0, 0), f(0, 0, 0), f(0, 0, 0)]
  ]

  expect(field).toStrictEqual(expectedField)
})

test("should generate a bomb field", () => {
  const field = generateBombField({ width: 2, height: 3 }, 5, { x: 1, y: 2 })

  const bombCount = field.reduce((count, row) => {
    return row.reduce((count, patch) => {
      return count + (patch.isBomb ? 1 : 0)
    }, count)
  }, 0)
  expect(bombCount).toBe(5)

  expect(field[1][2]).toStrictEqual(f(0, 0, 0))
})

test("should have no adjacent patches", () => {
  const patches = getAdjacentPatches({ width: 1, height: 1 }, { x: 0, y: 0 })
  expect(patches).toEqual([])
})

test("should have 8 adjacent patches", () => {
  const patches = getAdjacentPatches({ width: 3, height: 3 }, { x: 1, y: 1 })
  expect(patches).toEqual([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    // center patch
    { x: 1, y: 2 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 }
  ])
})

test("should get the correct adjecant patches", () => {
  const patches = getAdjacentPatches({ width: 2, height: 2 }, { x: 1, y: 1 })
  expect(patches).toEqual([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 }
  ])
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

test("should check nearby to be empty", () => {
  const count = getAdjacentBombCount(
    [
      [f(0, 0, 0), f(0, 0, 0), f(0, 0, 0)],
      [f(0, 0, 0), f(0, 0, 0), f(0, 0, 0)],
      [f(0, 0, 0), f(0, 0, 0), f(0, 0, 0)]
    ],
    { x: 1, y: 1 }
  )
  expect(count).toBe(0)
})

test("should check nearby for bombs", () => {
  const count = getAdjacentBombCount(
    [
      [f(1, 0, 0), f(1, 0, 0), f(1, 0, 0)],
      [f(1, 0, 0), f(0, 0, 0), f(1, 0, 0)],
      [f(1, 0, 0), f(1, 0, 0), f(1, 0, 0)]
    ],
    { x: 1, y: 1 }
  )
  expect(count).toBe(8)
})

test("should check nearby patches for mines correctly", () => {
  const field: FieldState = [
    [f(1, 1, 0), f(1, 0, 0)],
    [f(0, 0, 1), f(0, 0, 1)]
  ]

  expect(getAdjacentBombCount(field, { x: 1, y: 1 })).toBe(2)
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
  const field: FieldState = [[f(0, 0, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Grass)
})

test("should show grass for unrevealed bomb", () => {
  const field: FieldState = [[f(1, 0, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Grass)
})

test("should show empty", () => {
  const field: FieldState = [[f(0, 0, 1)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Empty)
})

test("should show flag", () => {
  const field: FieldState = [[f(0, 1, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Flag)
})

test("should show flag for marked bomb", () => {
  const field: FieldState = [[f(1, 1, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Flag)
})

test("should show bomb", () => {
  const field: FieldState = [[f(1, 0, 1)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Bomb)
})

test("should show nearby count for empty revealed", () => {
  const field: FieldState = [[f(0, 0, 1), f(1, 0, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.AdjacentBomb1)
})

test("should show grass for empty un-revealed", () => {
  const field: FieldState = [[f(0, 0, 0), f(1, 0, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Grass)
})

test("should generate a visible field", () => {
  const field: FieldState = [
    [f(1, 1, 0), f(1, 0, 0)],
    [f(0, 0, 1), f(0, 0, 1)]
  ]

  const visibleField = getVisibleField(field)
  const expectedVisibleField: VisibleField = [
    [VisiblePatch.Flag, VisiblePatch.Grass],
    [VisiblePatch.AdjacentBomb2, VisiblePatch.AdjacentBomb2]
  ]

  expect(visibleField).toStrictEqual(expectedVisibleField)
})
