import { UserEntity } from "./User.entity";

describe('User.entity.ts', () => {
  let userEntity: UserEntity;
  beforeEach(() => {
    userEntity = new UserEntity();
  });
  test('should be defined', () => {
    expect(userEntity).toBeInstanceOf(UserEntity);
  });
  test('should have id', () => {
    expect('id' in userEntity).toBeTruthy();
  });
  test('should have name', () => {
    expect(userEntity.name).toEqual('');
  });
});