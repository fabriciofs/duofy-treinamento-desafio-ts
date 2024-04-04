import { UserEntity } from "./User.entity"

describe('User.entity.ts', () => {
  let user: UserEntity;
  beforeEach(() => {
    user = new UserEntity()
  })
  test('Should be defined', () => {
    expect(user).toBeDefined()
    expect(user).toBeInstanceOf(UserEntity)
  })
  test('Should have id', () => {
    expect(user.id).toBeDefined()
    expect(user.id).toBe('')
  })
  test('Should have name', () => {
    expect(user.name).toBeDefined()
    expect(user.name).toBe('')
  })
})
