import { UserEntity } from "./User.entity";

describe('User.entity.ts', () => {
  let userEntity: UserEntity;
  beforeEach(() => {
    userEntity = new UserEntity();
    userEntity.id = '';
    userEntity.name = '';
  });
  test('should be defined', () => {
    expect(userEntity).toBeInstanceOf(UserEntity);
  });
  test('should have id', () => {
    expect(userEntity.id).toEqual('');
  });
  test('should have name', () => {
    expect(userEntity.name).toEqual('');
  });
});