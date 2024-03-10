import { BankEntity } from "./Bank.entity";
import { UserEntity } from "./User.entity";

describe('Bank.entity.ts', () => {
  let bankEntity: BankEntity;
  beforeEach(() => {
    bankEntity = new BankEntity();
    bankEntity.id = '';
    bankEntity.name = '';
    bankEntity.user = new UserEntity();
  });
  test('should be defined', () => {
    expect(bankEntity).toBeInstanceOf(BankEntity);
  });
  test('should have id', () => {
    expect(bankEntity.id).toEqual('');
  });
  test('should have name', () => {
    expect(bankEntity.name).toEqual('');
  });
  test('should have user', () => {
    expect(bankEntity.user).toBeInstanceOf(UserEntity);
  });
});
