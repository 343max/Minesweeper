import { FieldState, PatchCoordinate } from "./Field"

export function revealPatch(
  field: FieldState,
  { x, y }: PatchCoordinate
): FieldState {
  const patch = field[x][y]
  patch.isRevealed = true
  field[x][y] = patch
  return field
}
