import { BankEntity } from "../entities/Bank.entity";
import { CategoryEntity } from "../entities/Category.entity";
import { CategoryTypeEnum } from "../entities/CategoryType.enum";
import { TransactionEntity } from "../entities/Transaction.entity";
import { UserEntity } from "../entities/User.entity";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";
import { BankStatementType, IncomeAndExpensesByCategoryType, ReportService } from "./Report.service";


class MockHttpRequest<T> implements HttpRequestAbstract<T | T[]> {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async post(url: string, data: any): Promise<any> {
    return Promise.resolve(data);
  }

  async put(url: string, data: any): Promise<any> {
    return Promise.resolve(data);
  }

  async delete(url: string): Promise<void> {
    return Promise.resolve();
  }

  async get(url: string): Promise<T[]> {
    return Promise.resolve([]);
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
  type: CategoryTypeEnum.INCOME,
  user: mockUser
}

const mockCategoryExpense: CategoryEntity = {
  id: "2",
  name: 'Test Expense',
  type: CategoryTypeEnum.EXPENSE,
  user: mockUser
}

const mockTransactions: TransactionEntity[] = [
  {
    date: new Date('2023-01-02'),
    amount: 150,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryIncome
  },
  {
    date: new Date('2023-01-02'),
    amount: 50,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryExpense
  },
  {
    date: new Date('2024-01-02'),
    amount: 50,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryIncome
  },
  {
    date: new Date('2024-01-03'),
    amount: 25,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryExpense
  },
  {
    date: new Date('2024-01-04'),
    amount: 25,
    description: 'Test',
    user: mockUser,
    bank: mockBank,
    category: mockCategoryExpense
  },
  {
    date: new Date('2024-01-04'),
    amount: 25,
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
      type: CategoryTypeEnum.INCOME,
      categoryName: '',
      amount: 100,
      balance: 100
    },
    {
      date: '02/01/2024',
      description: 'Test',
      type: CategoryTypeEnum.INCOME,
      categoryName: 'Test Income',
      amount: 50,
      balance: 150
    },
    {
      date: '03/01/2024',
      description: 'Test',
      type: CategoryTypeEnum.EXPENSE,
      categoryName: 'Test Expense',
      amount: 25,
      balance: 125
    }
  ]

const expectedIncomeAndExpensesByCategory: IncomeAndExpensesByCategoryType[] = [
  {
    category: mockCategoryIncome,
    income: 75,
    expenses: 0
  },
  {
    category: mockCategoryExpense,
    income: 0,
    expenses: 50
  }
]

describe('Report.service.ts', () => {
  let reportService: ReportService;
  let mockHttpRequest: MockHttpRequest<TransactionEntity>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockHttpRequest = new MockHttpRequest<TransactionEntity>(`http://localhost:3000`);
    reportService = new ReportService(mockHttpRequest);
  });

  test('should be defined', () => {
    expect(reportService).toBeDefined();
  });

  describe('bankStatement', () => {
    beforeEach(() => {
      mockHttpRequest = new MockHttpRequest<TransactionEntity>(`http://localhost:3000`);
      reportService = new ReportService(mockHttpRequest);
      jest.spyOn(mockHttpRequest, 'get').mockResolvedValue(mockTransactions
        .filter(transaction => transaction.date <= new Date('2024-01-03')));
    });
    test('should return an empty array when no transactions are found', async () => {
      const result = await reportService.bankStatement(mockBank, new Date('2023-01-01'), new Date('2023-01-01'));
      expect(mockHttpRequest.get).toHaveBeenCalledTimes(1)
      expect(mockHttpRequest.get).toHaveBeenCalledWith(`transactions?bank=1&date_lte=2023-01-01T00:00:00.000Z`);
      expect(result).toEqual([{
        amount: 0,
        balance: 0,
        categoryName: "",
        date: "01/01/2023",
        description: "Saldo Inicial",
        type: "INCOME",
      }]);
    });

    test('should return a bank statement with one transaction', async () => {
      const result = await reportService.bankStatement(mockBank, new Date('2024-01-01'), new Date('2024-01-03'));
      expect(mockHttpRequest.get).toHaveBeenCalledTimes(1)
      expect(mockHttpRequest.get).toHaveBeenCalledWith(`transactions?bank=1&date_lte=2024-01-03T00:00:00.000Z`);
      expect(result).toEqual(expectedBankStatement);
    });
  });

  describe('incomeAndExpenseByCategory', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockHttpRequest = new MockHttpRequest<TransactionEntity>(`http://localhost:3000`);
      reportService = new ReportService(mockHttpRequest);
    });
    test('should return an empty array when no transactions are found', async () => {
      jest.spyOn(mockHttpRequest, 'get').mockResolvedValue([]);
      const result = await reportService.incomeAndExpenseByCategory(mockUser, new Date('2023-01-01'), new Date('2023-01-01'));
      expect(mockHttpRequest.get).toHaveBeenCalledWith(`transactions?user=1&date_gte=2023-01-01T00:00:00.000Z&date_lte=2023-01-01T00:00:00.000Z`);
      expect(result).toEqual([]);
    });

    test('should return income and expenses by category', async () => {
      jest.spyOn(mockHttpRequest, 'get').mockResolvedValue(mockTransactions
        .filter(transaction => transaction.date >= new Date('2024-01-02')));
      const result = await reportService.incomeAndExpenseByCategory(mockUser, new Date('2024-01-01'), new Date('2024-01-03'));
      expect(mockHttpRequest.get).toHaveBeenCalledWith(`transactions?user=1&date_gte=2024-01-01T00:00:00.000Z&date_lte=2024-01-03T00:00:00.000Z`);
      expect(result).toEqual(expectedIncomeAndExpensesByCategory);
    });

  });
});

