import { DefaultEntity } from "./Default.entity";
import { UserEntity } from "./User.entity";

describe('category.entity.ts', () => {
  let defaultEntity: DefaultEntity;
  beforeEach(() => {
    defaultEntity = new DefaultEntity()
  })
  test('Should be defined', () => {
    expect(defaultEntity).toBeDefined()
    expect(defaultEntity).toBeInstanceOf(DefaultEntity)
  })
  test('Should have id', () => {
    expect(defaultEntity.id).toBeDefined()
    expect(defaultEntity.id).toBe('')
  })
  test('Should have user', () => {
    expect(defaultEntity.user).toBeDefined()
    expect(defaultEntity.user).toBeInstanceOf(UserEntity)
  })
})
