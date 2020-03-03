export interface PatchCoordinate {
  x: number
  y: number
}

export interface FieldSize {
  width: number
  height: number
}

export enum VisiblePatch {
  Hidden,
  Empty,
  Bomb,
  Flag,
  Nearby1,
  Nearby2,
  Nearby3,
  Nearby4,
  Nearby5,
  Nearby6,
  Nearby7,
  Nearby8
}

export type BoolField = boolean[][]

interface FieldState {
  bombs: BoolField
  flags: BoolField
  revealed: BoolField
}

export function getAdjacentPatches(
  { width, height }: FieldSize,
  { x, y }: PatchCoordinate
): PatchCoordinate[] {
  return [
    { x: x - 1, y: y - 1 },
    { x: x + 0, y: y - 1 },
    { x: x + 1, y: y - 1 },
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

export function getFieldSize(field: BoolField): FieldSize {
  return { width: field.length, height: field[0]?.length ?? 0 }
}

export function getAdjacentBombCount(
  field: BoolField,
  center: PatchCoordinate
): number {
  return getAdjacentPatches(getFieldSize(field), center).filter(({ x, y }) => {
    return field[x][y]
  }).length
}

export function generateBombField(
  { width, height }: FieldSize,
  bombCount: number,
  safePatch: PatchCoordinate
): BoolField {
  let field = Array(width)
    .fill(false, 0, width)
    .map(() => {
      return Array(height).fill(false, 0, height)
    })

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max))
  }

  let currentCount = 0
  while (currentCount < bombCount) {
    const x = getRandomInt(width),
      y = getRandomInt(height)

    if (field[x][y] == true || (safePatch.x == x && safePatch.y == y)) {
      continue
    }

    field[x][y] = true
    currentCount += 1
  }

  return field
}
