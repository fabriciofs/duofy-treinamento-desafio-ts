import { BankEntity } from "../entities/Bank.entity"
import { CategoryEntity } from "../entities/Category.entity"
import { TransactionEntity } from "../entities/Transaction.entity"
import { CrudService, extraProcessingOperations } from "../helpers/CrudService"
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract"
import { TransactionService } from "./Transaction.service"

describe('Transaction.service.ts', () => {
  let transactionService: TransactionService
  let httpRequestBank: HttpRequestAbstract<BankEntity>
  let httpRequestCategory: HttpRequestAbstract<CategoryEntity>
  beforeEach(() => {
    jest.clearAllMocks();
    class HttpRequesMock<T> extends HttpRequestAbstract<T> {
      async get(url: string): Promise<T | T[]> {
        return []
      }
      async post(url: any, body: T): Promise<T> {
        return body
      }
      async put(url: string, body: Partial<T>): Promise<void> {
        return
      }
      async delete(url: string): Promise<void> {
        return
      }
    }
    const httpRequestTransaction = new HttpRequesMock<TransactionEntity>('http://localhost:3000');
    httpRequestBank = new HttpRequesMock<BankEntity>('http://localhost:3000');
    httpRequestCategory = new HttpRequesMock<CategoryEntity>('http://localhost:3000');
    transactionService = new TransactionService(
      httpRequestTransaction,
      httpRequestBank,
      httpRequestCategory,
    )
    jest.spyOn(transactionService, 'extraProcessing');
  });
  test('deve ser instanciado', () => {
    expect(transactionService).toBeInstanceOf(TransactionService);
    expect(transactionService).toBeInstanceOf(CrudService);
    expect(transactionService._endPoint).toBe('transaction');

  })
  test('deve chamar o método extraProcessing na inclusao', async () => {
    expect(await transactionService.hasExtraProcessing()).toBe(true);
    const transaction = new TransactionEntity();
    transaction.bank = { id: '1' } as BankEntity;
    transaction.category = { id: '1' } as CategoryEntity;
    await transactionService.create(transaction);
    expect(transactionService.extraProcessing).toHaveBeenCalledTimes(3);
    expect(transactionService.extraProcessing).toHaveBeenCalledWith(transaction, extraProcessingOperations.CREATING);
  })

  test('deve chamar o método extraProcessing na alteracao', async () => {
    expect(await transactionService.hasExtraProcessing()).toBe(true);
    const transaction = new TransactionEntity();
    transaction.bank = { id: '1' } as BankEntity;
    transaction.category = { id: '1' } as CategoryEntity;
    await transactionService.update('1', transaction);
    expect(transactionService.extraProcessing).toHaveBeenCalledTimes(3);
    expect(transactionService.extraProcessing).toHaveBeenCalledWith(transaction, extraProcessingOperations.UPDATING, "1");
  })

  test('deve retornar erro quando nao encontrar o banco', async () => {
    expect(await transactionService.hasExtraProcessing()).toBe(true);
    const transaction = new TransactionEntity();
    transaction.bank = { id: '1' } as BankEntity;
    transaction.category = { id: '1' } as CategoryEntity;
    jest.spyOn(httpRequestBank, 'get').mockImplementation(async () => {
      throw new Error("not found");
    });
    await expect(transactionService.create(transaction)).rejects.toThrow("Bank not found");
  });

  test('deve retornar erro quando nao encontrar a categoria', async () => {
    expect(await transactionService.hasExtraProcessing()).toBe(true);
    const transaction = new TransactionEntity();
    transaction.bank = { id: '1' } as BankEntity;
    transaction.category = { id: '1' } as CategoryEntity;
    jest.spyOn(httpRequestCategory, 'get').mockImplementation(async () => {
      throw new Error("not found");
    });
    await expect(transactionService.create(transaction)).rejects.toThrow("Category not found");
  });
})
