import { BaseEntity } from "./base";
import type { RecurringExpense } from "./recurringExpense";
import type { Movement } from "./movement";
import type { CardExpense } from "./cardExpense";

export interface RecurringInstance extends BaseEntity {
	recurring_expense_id: number;
	payment_date: string;
	movement_id: number | null;
	status: RecurringInstanceStatus;
	amount_actual: number | null;
	card_expense_id: number | null;
	// Relaciones opcionales
	recurring_expense?: RecurringExpense;
	movement?: Movement | null;
	card_expense?: CardExpense | null;
}

export enum RecurringInstanceStatus {
	PENDING = 0,
	PAID = 1,
	SKIPPED = 2,
}
