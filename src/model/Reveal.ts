import {
  FieldState,
  PatchCoordinate,
  getFieldSize,
  getAdjacentMineCount
} from "./PlayingField"

export function revealPatch(
  field: FieldState,
  { x, y }: PatchCoordinate
): FieldState {
  let toCheck = [{ x, y }]

  const { width, height } = getFieldSize(field)

  const validCoordinates = ({ x, y }: PatchCoordinate): boolean => {
    return x >= 0 && y >= 0 && x < width && y < height
  }

  while (toCheck.length > 0) {
    const { x, y } = toCheck.pop()

    if (field[x][y].isRevealed || field[x][y].isMine) {
      continue
    }

    field[x][y].isRevealed = true

    if (getAdjacentMineCount(field, { x, y }) == 0) {
      toCheck = [
        ...toCheck,
        ...[
          { x: x - 1, y: y - 1 },
          { x: x + 1, y: y - 1 },
          { x: x - 1, y: y + 1 },
          { x: x + 1, y: y + 1 },
          { x: x - 1, y },
          { x, y: y - 1 },
          { x: x + 1, y },
          { x, y: y + 1 }
        ].filter(({ x, y }) => {
          return validCoordinates({ x, y }) && !field[x][y].isRevealed
        })
      ]
    }
  }

  field[x][y].isRevealed = true

  return field
}

export function revealMines(field: FieldState): FieldState {
  return field.map(column => {
    return column.map(patch => {
      if (patch.isMine) {
        patch.isRevealed = true
      }
      return patch
    })
  })
}
