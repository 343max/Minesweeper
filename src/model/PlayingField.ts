export interface PatchCoordinate {
  x: number
  y: number
}

export interface FieldSize {
  width: number
  height: number
}

export enum VisiblePatch {
  Grass = "Grass",
  Empty = "Empty",
  Mine = "Mine",
  Flag = "Flag",
  AdjacentMine1 = "AdjacentMine1",
  AdjacentMine2 = "AdjacentMine2",
  AdjacentMine3 = "AdjacentMine3",
  AdjacentMine4 = "AdjacentMine4",
  AdjacentMine5 = "AdjacentMine5",
  AdjacentMine6 = "AdjacentMine6",
  AdjacentMine7 = "AdjacentMine7",
  AdjacentMine8 = "AdjacentMine8"
}

export type VisibleField = VisiblePatch[][]

export type BoolField = boolean[][]

export interface Patch {
  isMine: boolean
  isFlagged: boolean
  isRevealed: boolean
}

export type FieldState = Patch[][]

export function getAdjacentPatches(
  { width, height }: FieldSize,
  { x, y }: PatchCoordinate
): PatchCoordinate[] {
  return [
    { x: x - 1, y: y - 1 },
    { x: x - 1, y: y + 0 },
    { x: x - 1, y: y + 1 },
    { x: x + 0, y: y - 1 },
    // self patch
    { x: x + 0, y: y + 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y + 0 },
    { x: x + 1, y: y + 1 }
  ].filter(({ x, y }) => {
    return x >= 0 && y >= 0 && x < width && y < height
  })
}

export function getFieldSize(field: FieldState): FieldSize {
  return { width: field.length, height: field[0]?.length ?? 0 }
}

export function getAdjacentMineCount(
  field: FieldState,
  center: PatchCoordinate
): number {
  return getAdjacentPatches(getFieldSize(field), center).reduce(
    (count, { x, y }) => {
      return count + (field[x][y].isMine ? 1 : 0)
    },
    0
  )
}

export function getVisiblePatchForMineCount(mineCount: number): VisiblePatch {
  return [
    VisiblePatch.Empty,
    VisiblePatch.AdjacentMine1,
    VisiblePatch.AdjacentMine2,
    VisiblePatch.AdjacentMine3,
    VisiblePatch.AdjacentMine4,
    VisiblePatch.AdjacentMine5,
    VisiblePatch.AdjacentMine6,
    VisiblePatch.AdjacentMine7,
    VisiblePatch.AdjacentMine8
  ][mineCount]
}

export function getVisiblePatch(
  field: FieldState,
  coordinate: PatchCoordinate
): VisiblePatch {
  const { isMine: isMine, isFlagged, isRevealed } = field[coordinate.x][
    coordinate.y
  ]

  if (isFlagged && !isRevealed) {
    return VisiblePatch.Flag
  } else if (!isRevealed) {
    return VisiblePatch.Grass
  } else if (isMine) {
    return VisiblePatch.Mine
  } else {
    const adjacentMineCount = getAdjacentMineCount(field, coordinate)
    return getVisiblePatchForMineCount(adjacentMineCount)
  }
}

function filledArray<T>(count: number, fill: (i: number) => T | T): T[] {
  if (typeof fill === "function") {
    return Array(count)
      .fill(null, 0, count)
      .map((_, i) => {
        return fill(i)
      })
  } else {
    return Array(count).fill(fill, 0, count)
  }
}

export function getVisibleField(field: FieldState): VisibleField {
  const { width, height } = getFieldSize(field)
  return filledArray(width, x => {
    return filledArray(height, y => {
      return getVisiblePatch(field, { x, y })
    })
  })
}

export function emptyField({ width, height }: FieldSize): FieldState {
  return filledArray(width, () => {
    return filledArray(height, () => {
      return {
        isMine: false,
        isFlagged: false,
        isRevealed: false
      }
    })
  })
}

export function generateMinefield(
  { width, height }: FieldSize,
  mineCount: number,
  safePatch: PatchCoordinate
): FieldState {
  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max))
  }

  let field = emptyField({ width, height })

  let currentCount = 0
  while (currentCount < mineCount) {
    const x = getRandomInt(width),
      y = getRandomInt(height)

    if (field[x][y].isMine == true || (safePatch.x == x && safePatch.y == y)) {
      continue
    }

    field[x][y].isMine = true
    currentCount += 1
  }

  return field
}

export enum GameState {
  Playing = "Playing",
  Lost = "Lost",
  Won = "Won"
}

export function getGameState(field: FieldState): GameState {
  const flatField = field.reduce((array, row) => {
    return array.concat(row)
  }, [])

  if (
    flatField.find(patch => {
      return patch.isMine && patch.isRevealed
    })
  ) {
    return GameState.Lost
  } else if (
    flatField.find(patch => {
      return !patch.isMine && !patch.isRevealed
    })
  ) {
    return GameState.Playing
  } else {
    return GameState.Won
  }
}
