import { round } from "./round"

describe('round.ts', () => {
  test('should round the numbers corretly', () => {
    expect(round(1.234, 2)).toBe(1.23);
    expect(round(1.235, 2)).toBe(1.24);
    expect(round(1.234, 1)).toBe(1.2);
  })
})
