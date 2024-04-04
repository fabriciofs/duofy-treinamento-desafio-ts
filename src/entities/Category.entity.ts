import { DefaultEntity } from "./Default.entity";

export enum CategoryType {
  INCOME = "Receita",
  EXPENSE = "Despesa",
}

export class CategoryEntity extends DefaultEntity {
  name: string = "";
  type: CategoryType = CategoryType.INCOME;
}