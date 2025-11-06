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
	current_resume_usage?: CurrentResumeUsage;
	// Relaciones opcionales
	card_resumes?: CardResume[];
	installment_purchases?: CardInstallmentPurchase[];
}

export interface CurrentResumeUsage {
	card_id: number;
	card_resume_id: number | null;
	current_usage_amount: number;
	card_expense_count: number;
}
