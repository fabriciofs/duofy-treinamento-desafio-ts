import { BaseEntity } from "./Base.entity";
import { UserEntity } from "./User.entity";

describe('Base.entity.ts', () => {
  let baseEntity: BaseEntity;
  beforeEach(() => {
    baseEntity = new BaseEntity();
  });
  test('should be defined', () => {
    expect(baseEntity).toBeInstanceOf(BaseEntity);
  });
  test('should have id', () => {
    expect('id' in baseEntity).toBeTruthy();
  });
  test('should have user', () => {
    expect(baseEntity.user).toBeInstanceOf(UserEntity);
  });
});