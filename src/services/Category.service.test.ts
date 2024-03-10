import { CategoryEntity } from "../entities/Category.entity";
import { CrudService } from "../helpers/crudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";
import { CategoryService } from "./Category.service";

describe('Category.service.ts', () => {
  let categoryService: CategoryService;
  beforeEach(() => {
    categoryService = new CategoryService({} as HttpRequestAbstract<CategoryEntity | CategoryEntity[]>);
  });

  test('should be defined', () => {
    expect(categoryService).toBeInstanceOf(CrudService);
    expect(categoryService.URL).toBe('categories');
  });
});