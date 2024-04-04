import { BankEntity } from "../entities/Bank.entity"
import { CategoryEntity, CategoryType } from "../entities/Category.entity"
import { TransactionEntity } from "../entities/Transaction.entity"
import { UserEntity } from "../entities/User.entity"
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract"
import { BankStatementType, ReportService } from "./Report.service"

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

const mockUser: UserEntity = {
  id: "1",
  name: 'Test User'
}

const mockBank: BankEntity = {
  id: "1",
  name: 'Test Bank',
  user: mockUser
}

const mockCategoryIncome: CategoryEntity = {
  id: "1",
  name: 'Test Income',
  type: CategoryType.INCOME,
  user: mockUser
}

const mockCategoryExpense: CategoryEntity = {
  id: "2",
  name: 'Test Expense',
  type: CategoryType.EXPENSE,
  user: mockUser
}

const mockTransactions: TransactionEntity[] = [
  {
    date: new Date('2023-01-02'),
    value: 150,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryIncome
  },
  {
    date: new Date('2023-01-02'),
    value: 50,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryExpense
  },
  {
    date: new Date('2024-01-02'),
    value: 50,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryIncome
  },
  {
    date: new Date('2024-01-03'),
    value: 25,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryExpense
  },
  {
    date: new Date('2024-01-04'),
    value: 25,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryExpense
  },
  {
    date: new Date('2024-01-04'),
    value: 25,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryIncome
  }
]

const expectedBankStatement: BankStatementType[] =
  [
    {
      date: '01/01/2024',
      description: 'Saldo Inicial',
      type: CategoryType.INCOME,
      categoryName: '',
      amount: 100,
      balance: 100
    },
    {
      date: '02/01/2024',
      description: 'Test',
      type: CategoryType.INCOME,
      categoryName: 'Test Income',
      amount: 50,
      balance: 150
    },
    {
      date: '03/01/2024',
      description: 'Test',
      type: CategoryType.EXPENSE,
      categoryName: 'Test Expense',
      amount: 25,
      balance: 125
    }
  ]



describe('Report.service.ts', () => {
  let httpRequest = new HttpRequesMock<TransactionEntity>("transaction")
  let reportService = new ReportService(httpRequest)
  beforeEach(() => {
    jest.clearAllMocks();
    httpRequest = new HttpRequesMock<TransactionEntity>("transaction")
    reportService = new ReportService(httpRequest)
    jest.spyOn(httpRequest, 'get').mockResolvedValue(mockTransactions
      .filter(transaction => transaction.date <= new Date('2024-01-03')))
  })

  test('deve ser definido', () => {
    expect(reportService).toBeDefined()
  })
  test('deve chamar o método getMany com o parametro correto', async () => {
    reportService.bankStatement(mockBank, new Date('2024-01-01'), new Date('2024-01-03'))
    expect(httpRequest.get).toHaveBeenCalledTimes(1)
    expect(httpRequest.get).toHaveBeenCalledWith('transaction?bank=1&date_lte=2024-01-03T00:00:00.000Z')
  })
  test('should return a bank statement with one transaction', async () => {
    const result = await reportService.bankStatement(mockBank, new Date('2024-01-01'), new Date('2024-01-03'));
    expect(httpRequest.get).toHaveBeenCalledTimes(1)
    expect(httpRequest.get).toHaveBeenCalledWith(`transaction?bank=1&date_lte=2024-01-03T00:00:00.000Z`);
    expect(result).toEqual(expectedBankStatement);
  });
})
