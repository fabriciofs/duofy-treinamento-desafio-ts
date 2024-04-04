import { BaseEntity } from "./Base.entity";
import { CategoryEntity } from "./Category.entity";
import { CategoryTypeEnum } from "./CategoryType.enum";

describe('Category.entity.ts', () => {
  let categoryEntity: CategoryEntity;
  beforeEach(() => {
    categoryEntity = new CategoryEntity();
  });
  test('should be defined', () => {
    expect(categoryEntity).toBeInstanceOf(BaseEntity);
  });
  test('should have id', () => {
    expect('id' in categoryEntity).toBeTruthy();
  });
  test('should have name', () => {
    expect(categoryEntity.name).toEqual('');
  });
  test('should have type', () => {
    expect(categoryEntity.type).toEqual(CategoryTypeEnum.EXPENSE);
  });
  test('should have user', () => {
    expect('user' in categoryEntity).toBeTruthy();
  });
});