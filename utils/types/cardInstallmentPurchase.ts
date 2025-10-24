import { BaseEntity } from "./base";
import type { Card } from "./card";
import type { CardExpense } from "./cardExpense";

export interface CardInstallmentPurchase extends BaseEntity {
	card_id: number;
	description: string;
	total_amount: number;
	total_installments: number;
	installments_paid: number;
	currency: string;
	name: string;
	// Relaciones opcionales
	card?: Card;
	card_expenses?: CardExpense[];
}
