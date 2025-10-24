import { BaseEntity } from "./base";
import type { Card } from "./card";
import type { Movement } from "./movement";
import type { CardExpense } from "./cardExpense";

export interface CardResume extends BaseEntity {
	month: string;
	card_id: number;
	from_date: string;
	to_date: string | null;
	due_date: string | null;
	amount: number | null;
	carried_amount: number | null;
	movement_id: number | null;
	// Relaciones opcionales
	card?: Card;
	movement?: Movement | null;
	card_expenses?: CardExpense[];
}
