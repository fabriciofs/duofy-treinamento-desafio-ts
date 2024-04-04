import { BankEntity } from "./Bank.entity";
import { BaseEntity } from "./Base.entity";
import { CategoryEntity } from "./Category.entity";
import { TransactionEntity } from "./Transaction.entity";

describe('Transaction.entity.ts', () => {
  let transactionEntity: TransactionEntity;
  let transactionDate = new Date();
  beforeEach(() => {
    transactionEntity = new TransactionEntity();
    transactionEntity.date = transactionDate;
  });
  test('should be defined', () => {
    expect(transactionEntity).toBeInstanceOf(TransactionEntity);
    expect(transactionEntity).toBeInstanceOf(BaseEntity);
  });
  test('should have id', () => {
    expect('id' in transactionEntity).toBeTruthy();
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
    expect('user' in transactionEntity).toBeTruthy();
  });
  test('should have bank', () => {
    expect(transactionEntity.bank).toBeInstanceOf(BankEntity);
  });
  test('should have category', () => {
    expect(transactionEntity.category).toBeInstanceOf(CategoryEntity);
  });
});