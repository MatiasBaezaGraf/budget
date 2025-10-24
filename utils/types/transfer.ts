import { BaseEntity } from "./base";
import type { Account } from "./account";

export interface Transfer extends BaseEntity {
	from_account_id: number;
	to_account_id: number;
	amount: number;
	date: string;
	description: string | null;
	// Relaciones opcionales
	from_account?: Account;
	to_account?: Account;
}
