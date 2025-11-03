import { BaseEntity } from "./base";
import type { Account } from "./account";
import type { CardResume } from "./cardResume";
import type { CardInstallmentPurchase } from "./cardInstallmentPurchase";

export interface Card extends BaseEntity {
	name: string;
	limit_amount: number;
	linked_account_id: number;
	// Campos auxiliares
	linked_account_name?: string;

	// Relaciones opcionales
	card_resumes?: CardResume[];
	installment_purchases?: CardInstallmentPurchase[];
}
