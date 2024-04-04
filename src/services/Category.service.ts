import { CategoryEntity } from "../entities/Category.entity";
import { CrudService, extraProcessingOperations } from "../helpers/CrudService";
import { HttpRequestAbstract } from "../infra/HttpRequestAbstract";

export class CategoryService extends CrudService<CategoryEntity> {

  constructor(httpRequest: HttpRequestAbstract<CategoryEntity>) {
    super(httpRequest, 'category')
  }

  extraProcessing(entity: Partial<CategoryEntity>, operation: extraProcessingOperations, id?: string | undefined): Promise<CategoryEntity> {
    throw new Error("Method not implemented.");
  }
}