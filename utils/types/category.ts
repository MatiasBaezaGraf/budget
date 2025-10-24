import { BaseEntity } from "./base";

export interface Category extends BaseEntity {
	name: string;
	type: CategoryType;
	parent_category_id: number | null;
	lucide_icon: string;
	color: string;
}

export enum CategoryType {
	EXPENSE = 0,
	INCOME = 1,
}
