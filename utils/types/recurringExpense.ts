import { BaseEntity } from "./base";
import type { Category } from "./category";
import type { Card } from "./card";
import type { RecurringInstance } from "./recurringInstance";

export interface RecurringExpense extends BaseEntity {
	name: string;
	payment_method: PaymentMethod;
	current_amount: number;
	category_id: number;
	next_due_date: string | null;
	card_id: number | null;
	next_billing_day: number | null;
	// Relaciones opcionales
	category?: Category;
	card?: Card | null;
	recurring_instances?: RecurringInstance[];
}

export enum PaymentMethod {
	TRANSFER = 0,
	CASH = 1,
	CARD = 2,
}
