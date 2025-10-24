import { BaseEntity } from "./base";
import type { Account } from "./account";
import type { Category } from "./category";

export interface Movement extends BaseEntity {
	amount: number;
	flow: FlowType;
	description: string;
	account_id: number;
	category_id: number;
	date: string;
	// Relaciones opcionales
	account?: Account;
	category?: Category;
}

export enum FlowType {
	EXPENSE = 0,
	INCOME = 1,
}
