import { generateBombField } from "../src/model/Field"

test("should generate a bomb field", () => {
  const field = generateBombField(5, 6, 29, { x: 3, y: 4 })

  console.log(field)

  expect(field.length).toBe(5)

  field.forEach(row => {
    expect(row.length).toBe(6)
  })

  const bombCount = field.reduce((count, row) => {
    return row.reduce((count, patch) => {
      return count + (patch ? 1 : 0)
    }, count)
  }, 0)
  expect(bombCount).toBe(29)
  expect(field[3][4]).toBe(false)
})
