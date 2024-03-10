import { BankEntity } from "./Bank.entity";
import { CategoryEntity } from "./Category.entity";
import { TransactionEntity } from "./Transaction.entity";
import { UserEntity } from "./User.entity";

describe('Transaction.entity.ts', () => {
  let transactionEntity: TransactionEntity;
  let transactionDate = new Date();
  beforeEach(() => {
    transactionEntity = new TransactionEntity();
    transactionEntity.id = '';
    transactionEntity.date = transactionDate;
    transactionEntity.amount = 0;
    transactionEntity.description = '';
    transactionEntity.user = new UserEntity();
    transactionEntity.bank = new BankEntity();
    transactionEntity.category = new CategoryEntity();
  });
  test('should be defined', () => {
    expect(transactionEntity).toBeInstanceOf(TransactionEntity);
  });
  test('should have id', () => {
    expect(transactionEntity.id).toEqual('');
  });
  test('should have date', () => {
    expect(transactionEntity.date).toEqual(transactionDate);
  });
  test('should have amount', () => {
    expect(transactionEntity.amount).toEqual(0);
  });
  test('should have description', () => {
    expect(transactionEntity.description).toEqual('');
  });
  test('should have user', () => {
    expect(transactionEntity.user).toBeInstanceOf(UserEntity);
  });
  test('should have bank', () => {
    expect(transactionEntity.bank).toBeInstanceOf(BankEntity);
  });
  test('should have category', () => {
    expect(transactionEntity.category).toBeInstanceOf(CategoryEntity);
  });
});