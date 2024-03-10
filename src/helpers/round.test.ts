import { round } from "./round"

describe('round.ts', () => {
  test('should round the numbers correctly', () => {
    expect(round(1.005, 2)).toBe(1.01)
    expect(round(1.004, 2)).toBe(1)
    expect(round(1.005, 0)).toBe(1)
    expect(round(1.004, 0)).toBe(1)
  })
})
