import { CategoryEntity, CategoryType } from './Category.entity';
import { DefaultEntity } from './Default.entity';

describe('category.entity.ts', () => {
  let category: CategoryEntity;
  beforeEach(() => {
    category = new CategoryEntity()
  })
  test('Should be defined', () => {
    expect(category).toBeDefined()
    expect(category).toBeInstanceOf(CategoryEntity)
    expect(category).toBeInstanceOf(DefaultEntity)
  })
  test('Should have name', () => {
    expect(category.name).toBeDefined()
    expect(category.name).toBe('')
  })
  test('Should have type', () => {
    expect(category.type).toBeDefined()
    expect(category.type).toBe(CategoryType.INCOME)
  })
})
