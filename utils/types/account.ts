import { BaseEntity } from "./base";
import type { Movement } from "./movement";
import type { Transfer } from "./transfer";
import type { Card } from "./card";

export interface Account extends BaseEntity {
	name: string;
	type: AccountType;
	currency: string;
	// Relaciones opcionales
	movements?: Movement[];
	cards?: Card[];
	transfers_from?: Transfer[];
	transfers_to?: Transfer[];
}

export enum AccountType {
	BANK = 0,
	CASH = 1,
	WALLET = 2,
}
