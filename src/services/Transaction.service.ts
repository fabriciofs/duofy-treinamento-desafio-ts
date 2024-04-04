import { BankEntity } from "../entities/Bank.entity";
import { CategoryEntity } from "../entities/Category.entity";
import { TransactionEntity } from "../entities/Transaction.entity";
import { CrudService, extraProcessingOperations } from "../helpers/CrudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";
import { BankService } from "./Bank.service";
import { CategoryService } from './Category.service';

export class TransactionService extends CrudService<TransactionEntity> {
  constructor(
    httpRequest: HttpRequestAbstract<TransactionEntity>,
    private readonly httpRequestBank?: HttpRequestAbstract<BankEntity>,
    private readonly httpRequestCategory?: HttpRequestAbstract<CategoryEntity>,
  ) {
    super(httpRequest, 'transaction')
  }

  async extraProcessing(
    entity: Partial<TransactionEntity>,
    operation: extraProcessingOperations,
    id?: string | undefined): Promise<TransactionEntity> {
    if (operation === extraProcessingOperations.CREATING || operation === extraProcessingOperations.UPDATING) {
      if (entity.bank && this.httpRequestBank) {
        try {
          const { id: idBank } = entity.bank;
          const bankService = new BankService(this.httpRequestBank)
          const bank = await bankService.getById(idBank as string);
          entity.bank = bank;
        } catch (error) {
          throw new Error("Bank not found");
        }
      }
      if (entity.category && this.httpRequestCategory) {
        try {
          const { id: idCategory } = entity.category;
          const categoryService = new CategoryService(this.httpRequestCategory)
          const category = await categoryService.getById(idCategory as string);
          entity.category = category;
        } catch (error) {
          throw new Error("Category not found");
        }
      }
      return entity as TransactionEntity;
    }

    return entity as TransactionEntity;
  }
}