import { BankEntity } from "./Bank.entity";
import { CategoryEntity } from "./Category.entity";
import { DefaultEntity } from "./Default.entity";
import { TransactionEntity } from "./Transaction.entity";

describe('Bank.entity.ts', () => {
  let transaction: TransactionEntity;
  let transactionDate = new Date();
  beforeEach(() => {
    transaction = new TransactionEntity()
    transaction.date = transactionDate
  })
  test('Should be defined', () => {
    expect(transaction).toBeDefined()
    expect(transaction).toBeInstanceOf(TransactionEntity)
    expect(transaction).toBeInstanceOf(DefaultEntity)
  })
  test('Should have date', () => {
    expect(transaction.date).toBeDefined()
    expect(transaction.date).toBe(transactionDate)
  })
  test('Should have description', () => {
    expect(transaction.description).toBeDefined()
    expect(transaction.description).toBe('')
  })
  test('Should have value', () => {
    expect(transaction.value).toBeDefined()
    expect(transaction.value).toBe(0)
  })
  test('Should have category', () => {
    expect(transaction.category).toBeDefined()
    expect(transaction.category).toBeInstanceOf(CategoryEntity)
  })
  test('Should have bank', () => {
    expect(transaction.bank).toBeDefined()
    expect(transaction.bank).toBeInstanceOf(BankEntity)
  })

})
