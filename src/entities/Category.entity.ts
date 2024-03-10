import { CategoryTypeEnum } from "./CategoryType.enum";
import { UserEntity } from "./User.entity";

export class CategoryEntity {
  id?: string = "";
  name: string = "";
  type: CategoryTypeEnum = CategoryTypeEnum.EXPENSE;
  user: UserEntity = new UserEntity();
}