import { BankEntity } from "../entities/Bank.entity";
import { CrudService } from "../helpers/crudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";
import { BankService } from "./Bank.service";

describe('Bank.service.ts', () => {
  let bankService: BankService;
  beforeEach(() => {
    bankService = new BankService({} as HttpRequestAbstract<BankEntity | BankEntity[]>);
  });

  test('should be defined', () => {
    expect(bankService).toBeInstanceOf(CrudService);
    expect(bankService.URL).toBe('banks');
  });
});