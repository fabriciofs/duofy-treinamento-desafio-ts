import { dateToCharacter } from "./dateToCharacter"

describe('dateToCharacter.ts', () => {
  test('should convert date to character correctly', () => {
    expect(dateToCharacter(new Date('2021-01-01T00:00:00.000Z'))).toBe('01/01/2021')
    expect(dateToCharacter(new Date('2021-01-02T00:00:00.000Z'))).toBe('02/01/2021')
    expect(dateToCharacter(new Date('2024-03-20T00:00:00.000Z'))).toBe('20/03/2024')
  })
})
