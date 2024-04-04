import { BankEntity } from "../entities/Bank.entity";
import { CrudService, extraProcessingOperations } from "../helpers/CrudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";

export class BankService extends CrudService<BankEntity> {

  constructor(httpRequest: HttpRequestAbstract<BankEntity>) {
    super(httpRequest, 'bank')
  }

  extraProcessing(entity: Partial<BankEntity>, operation: extraProcessingOperations, id?: string | undefined): Promise<BankEntity> {
    throw new Error("Method not implemented.");
  }
}