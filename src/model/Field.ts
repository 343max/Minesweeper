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
  Bomb = "Bomb",
  Flag = "Flag",
  AdjacentBomb1 = "AdjacentBomb1",
  AdjacentBomb2 = "AdjacentBomb2",
  AdjacentBomb3 = "AdjacentBomb3",
  AdjacentBomb4 = "AdjacentBomb4",
  AdjacentBomb5 = "AdjacentBomb5",
  AdjacentBomb6 = "AdjacentBomb6",
  AdjacentBomb7 = "AdjacentBomb7",
  AdjacentBomb8 = "AdjacentBomb8"
}

export type VisibleField = VisiblePatch[][]

export type BoolField = boolean[][]

export interface Patch {
  isBomb: boolean
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

export function getAdjacentBombCount(
  field: FieldState,
  center: PatchCoordinate
): number {
  return getAdjacentPatches(getFieldSize(field), center).reduce(
    (count, { x, y }) => {
      return count + (field[x][y].isBomb ? 1 : 0)
    },
    0
  )
}

export function getVisiblePatchForBombCount(bombCount: number): VisiblePatch {
  return [
    VisiblePatch.Empty,
    VisiblePatch.AdjacentBomb1,
    VisiblePatch.AdjacentBomb2,
    VisiblePatch.AdjacentBomb3,
    VisiblePatch.AdjacentBomb4,
    VisiblePatch.AdjacentBomb5,
    VisiblePatch.AdjacentBomb6,
    VisiblePatch.AdjacentBomb7,
    VisiblePatch.AdjacentBomb8
  ][bombCount]
}

export function getVisiblePatch(
  field: FieldState,
  coordinate: PatchCoordinate
): VisiblePatch {
  const { isBomb, isFlagged, isRevealed } = field[coordinate.x][coordinate.y]

  if (isFlagged) {
    return VisiblePatch.Flag
  } else if (!isRevealed) {
    return VisiblePatch.Grass
  } else if (isBomb) {
    return VisiblePatch.Bomb
  } else {
    const adjacentBombCount = getAdjacentBombCount(field, coordinate)
    return getVisiblePatchForBombCount(adjacentBombCount)
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
        isBomb: false,
        isFlagged: false,
        isRevealed: false
      }
    })
  })
}

export function generateBombField(
  { width, height }: FieldSize,
  bombCount: number,
  safePatch: PatchCoordinate
): FieldState {
  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max))
  }

  let field = emptyField({ width, height })

  let currentCount = 0
  while (currentCount < bombCount) {
    const x = getRandomInt(width),
      y = getRandomInt(height)

    if (field[x][y].isBomb == true || (safePatch.x == x && safePatch.y == y)) {
      continue
    }

    field[x][y].isBomb = true
    currentCount += 1
  }

  return field
}
