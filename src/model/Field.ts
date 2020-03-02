export interface PatchCoordinate {
  x: number
  y: number
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

export function generateBombField(
  width: number,
  height: number,
  bombCount: number,
  safePatch: PatchCoordinate
): boolean[][] {
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
