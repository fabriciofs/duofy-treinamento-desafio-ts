import { BaseEntity } from "./Base.entity";
import { CategoryTypeEnum } from "./CategoryType.enum";

export class CategoryEntity extends BaseEntity {
  name: string = "";
  type: CategoryTypeEnum = CategoryTypeEnum.EXPENSE;
}