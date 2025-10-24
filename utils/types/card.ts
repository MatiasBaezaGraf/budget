import { BaseEntity } from "./base";
import type { Account } from "./account";
import type { CardResume } from "./cardResume";
import type { CardInstallmentPurchase } from "./cardInstallmentPurchase";

export interface Card extends BaseEntity {
	name: string;
	limit_amount: number;
	linked_account_id: number;
	// Relaciones opcionales
	linked_account?: Account | null;
	card_resumes?: CardResume[];
	installment_purchases?: CardInstallmentPurchase[];
}
