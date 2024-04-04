import { BankEntity } from "../entities/Bank.entity"
import { CrudService } from "../helpers/CrudService"
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract"
import { BankService } from "./Bank.service"

describe('Bank.service.ts', () => {
  let bankService: BankService
  beforeEach(() => {
    bankService = new BankService({} as HttpRequestAbstract<BankEntity>)
  });
  test('deve ser instanciado', () => {
    expect(bankService).toBeInstanceOf(BankService);
    expect(bankService).toBeInstanceOf(CrudService);
    expect(bankService._endPoint).toBe('bank');
  })
  test('não deve chamar o método extraProcessing', async () => {
    expect(await bankService.hasExtraProcessing()).toBe(false);
  })
})
