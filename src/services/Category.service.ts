import { CategoryEntity } from "../entities/Category.entity";
import { CrudService } from "../helpers/crudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";

export class CategoryService extends CrudService<CategoryEntity | CategoryEntity[]> {
  constructor(httpRequest: HttpRequestAbstract<CategoryEntity | CategoryEntity[]>) {
    super(httpRequest, 'categories');
  }
}