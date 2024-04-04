import { CategoryEntity } from "../entities/Category.entity"
import { CrudService } from "../helpers/CrudService"
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract"
import { CategoryService } from "./Category.service"

describe('Category.service.ts', () => {
  let categoryService: CategoryService
  beforeEach(() => {
    categoryService = new CategoryService({} as HttpRequestAbstract<CategoryEntity>)
  });
  test('deve ser instanciado', async () => {
    expect(categoryService).toBeInstanceOf(CategoryService);
    expect(categoryService).toBeInstanceOf(CrudService);
    expect(categoryService._endPoint).toBe('category');
  })
  test('não deve chamar o método extraProcessing', async () => {
    expect(await categoryService.hasExtraProcessing()).toBe(false);
  })
})
