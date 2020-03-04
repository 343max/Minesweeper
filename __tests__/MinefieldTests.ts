import {
  emptyField,
  FieldState,
  generateMinefield,
  getAdjacentMineCount,
  getAdjacentPatches,
  getFieldSize,
  getVisibleField,
  getVisiblePatch,
  getVisiblePatchForMineCount,
  VisibleField,
  VisiblePatch,
  BoolField,
  Patch,
  FieldSize,
  getGameState,
  GameState
} from "../src/model/PlayingField"

function f(isMine: number, isFlagged: number, isRevealed: number): Patch {
  return {
    isMine: isMine == 1,
    isFlagged: isFlagged == 1,
    isRevealed: isRevealed == 1
  }
}

test("should generate a patch", () => {
  const patch = f(0, 1, 1)
  expect(f(0, 1, 1)).toStrictEqual({
    isMine: false,
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

test("should generate a minefield", () => {
  const field = generateMinefield({ width: 2, height: 3 }, 5, { x: 1, y: 2 })

  const mineCount = field.reduce((count, row) => {
    return row.reduce((count, patch) => {
      return count + (patch.isMine ? 1 : 0)
    }, count)
  }, 0)
  expect(mineCount).toBe(5)

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
  const field = generateMinefield({ width: 5, height: 3 }, 0, { x: 0, y: 0 })
  const size = getFieldSize(field)
  expect(size).toEqual({ width: 5, height: 3 })
})

test("should correctly messure an empty field", () => {
  const size = getFieldSize([])
  expect(size).toEqual({ width: 0, height: 0 })
})

test("should check nearby to be empty", () => {
  const count = getAdjacentMineCount(
    [
      [f(0, 0, 0), f(0, 0, 0), f(0, 0, 0)],
      [f(0, 0, 0), f(0, 0, 0), f(0, 0, 0)],
      [f(0, 0, 0), f(0, 0, 0), f(0, 0, 0)]
    ],
    { x: 1, y: 1 }
  )
  expect(count).toBe(0)
})

test("should check nearby for mines", () => {
  const count = getAdjacentMineCount(
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

  expect(getAdjacentMineCount(field, { x: 1, y: 1 })).toBe(2)
})

test("should get Empty Patch", () => {
  const patch = getVisiblePatchForMineCount(0)
  expect(patch).toBe(VisiblePatch.Empty)
})

test("should get AdjacentMine1", () => {
  const patch = getVisiblePatchForMineCount(1)
  expect(patch).toBe(VisiblePatch.AdjacentMine1)
})

test("should get AdjacentMine7", () => {
  const patch = getVisiblePatchForMineCount(7)
  expect(patch).toBe(VisiblePatch.AdjacentMine7)
})

test("should show grass", () => {
  const field: FieldState = [[f(0, 0, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Grass)
})

test("should show grass for unrevealed mine", () => {
  const field: FieldState = [[f(1, 0, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Grass)
})

test("should show flag for a flagged unrevealed mine", () => {
  const field: FieldState = [[f(1, 1, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Flag)
})

test("should show mine for a flagged revealed mine", () => {
  const field: FieldState = [[f(1, 1, 1)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Mine)
})

test("should show sand for a flagged revealed sand", () => {
  const field: FieldState = [[f(0, 1, 1)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Empty)
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

test("should show flag for marked mine", () => {
  const field: FieldState = [[f(1, 1, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Flag)
})

test("should show mine", () => {
  const field: FieldState = [[f(1, 0, 1)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.Mine)
})

test("should show nearby count for empty revealed", () => {
  const field: FieldState = [[f(0, 0, 1), f(1, 0, 0)]]
  const patch = getVisiblePatch(field, { x: 0, y: 0 })
  expect(patch).toBe(VisiblePatch.AdjacentMine1)
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
    [VisiblePatch.AdjacentMine2, VisiblePatch.AdjacentMine2]
  ]

  expect(visibleField).toStrictEqual(expectedVisibleField)
})

test("should return GameState.Playing when the user is still playing", () => {
  const field: FieldState = [[f(1, 0, 0), f(0, 1, 0), f(0, 0, 1)]]
  const state = getGameState(field)
  expect(state).toBe(GameState.Playing)
})

test("should return GameState.GameLost when a patch is revealed that contains a mine", () => {
  const field: FieldState = [[f(1, 0, 1), f(0, 1, 0), f(0, 0, 1)]]
  const state = getGameState(field)
  expect(state).toBe(GameState.Lost)
})

test("should return GameState.GameWon when there are no more unrevealed patches without", () => {
  const field: FieldState = [[f(1, 0, 0), f(0, 0, 1), f(0, 0, 1)]]
  const state = getGameState(field)
  expect(state).toBe(GameState.Won)
})
