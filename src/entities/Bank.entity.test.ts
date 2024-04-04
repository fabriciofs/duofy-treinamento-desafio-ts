import { BankEntity } from "./Bank.entity";
import { DefaultEntity } from "./Default.entity";

describe('Bank.entity.ts', () => {
  let bank: BankEntity;
  beforeEach(() => {
    bank = new BankEntity()
  })
  test('Should be defined', () => {
    expect(bank).toBeDefined()
    expect(bank).toBeInstanceOf(BankEntity)
    expect(bank).toBeInstanceOf(DefaultEntity)
  })
  test('Should have name', () => {
    expect(bank.name).toBeDefined()
    expect(bank.name).toBe('')
  })

})
