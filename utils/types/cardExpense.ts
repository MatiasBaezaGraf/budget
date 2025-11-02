import { BaseEntity } from "./base";
import type { Card } from "./card";
import type { CardResume } from "./cardResume";
import type { CardInstallmentPurchase } from "./cardInstallmentPurchase";
import { Category } from "./category";

export interface CardExpense extends BaseEntity {
	card_id: number;
	card_resume_id: number;
	card_installment_purchase_id: number | null;
	installment_number: number | null;
	date: string;
	amount: number;
	currency: string;
	name: string;
	// Relaciones opcionales
	card?: Card;
	card_resume?: CardResume;
	card_installment_purchase?: CardInstallmentPurchase | null;
	category?: Category;
}
