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
	previous_account_balance: number;
	current_account_balance: number;
	// Campos auxiliares
	category_name?: string;
	category_type?: string;
	category_icon?: string;
	// Relaciones opcionales
	account?: Account;
}

export enum FlowType {
	EXPENSE = 0,
	INCOME = 1,
}
