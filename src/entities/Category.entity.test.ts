import { CategoryEntity } from "./Category.entity";
import { CategoryTypeEnum } from "./CategoryType.enum";
import { UserEntity } from "./User.entity";

describe('Category.entity.ts', () => {
  let categoryEntity: CategoryEntity;
  beforeEach(() => {
    categoryEntity = new CategoryEntity();
    categoryEntity.id = '';
    categoryEntity.name = '';
    categoryEntity.type = CategoryTypeEnum.EXPENSE;
    categoryEntity.user = new UserEntity();
  });
  test('should be defined', () => {
    expect(categoryEntity).toBeInstanceOf(CategoryEntity);
  });
  test('should have id', () => {
    expect(categoryEntity.id).toEqual('');
  });
  test('should have name', () => {
    expect(categoryEntity.name).toEqual('');
  });
  test('should have type', () => {
    expect(categoryEntity.type).toEqual(CategoryTypeEnum.EXPENSE);
  });
  test('should have user', () => {
    expect(categoryEntity.user).toBeInstanceOf(UserEntity);
  });
});