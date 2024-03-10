import { CategoryTypeEnum } from "./CategoryType.enum";

describe('CategoryType.enum.ts', () => {
  test('should have EXPENSE', () => {
    expect(CategoryTypeEnum.EXPENSE).toEqual('EXPENSE');
  });
  test('should have INCOME', () => {
    expect(CategoryTypeEnum.INCOME).toEqual('INCOME');
  });
});