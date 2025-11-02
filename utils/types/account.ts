import { BaseEntity } from "./base";
import type { Movement } from "./movement";
import type { Transfer } from "./transfer";
import type { Card } from "./card";
import { Banknote, Landmark, Wallet } from "lucide-react";

export interface Account extends BaseEntity {
	name: string;
	type: AccountType;
	currency: string;
	// Campo auxiliar para el balance
	balance?: number;
	// Relaciones opcionales
	movements?: Movement[];
	cards?: Card[];
	transfers_from?: Transfer[];
	transfers_to?: Transfer[];
}

export interface AccountBalance {
	id: string;
	balance: number;
}

export enum AccountType {
	BANK = 0,
	CASH = 1,
	WALLET = 2,
}

export const AccountTypeLabel: Record<AccountType, string> = {
	[AccountType.BANK]: "Transferencia",
	[AccountType.CASH]: "Efectivo",
	[AccountType.WALLET]: "Transferencia",
};

export const AccountTypeIconName: Record<AccountType, string> = {
	[AccountType.BANK]: "Landmark",
	[AccountType.CASH]: "Banknote",
	[AccountType.WALLET]: "Wallet",
};
