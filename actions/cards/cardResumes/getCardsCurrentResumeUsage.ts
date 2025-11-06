"use server";

import { createClient } from "@/utils/supabase/server";
import { CurrentResumeUsage } from "@/utils/types/card";

export const getCardsCurrentResumeUsage = async (
	cardIds: number[]
): Promise<CurrentResumeUsage[]> => {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("card_current_resume_usage")
		.select("*")
		.in("card_id", cardIds);

	if (error) {
		throw new Error(error.message);
	}

	// Si alguna tarjeta no tiene resumen actual, agregar entrada con valores en 0
	const resultMap = new Map(data?.map((item) => [item.card_id, item]) || []);
	const results = cardIds.map(
		(cardId) =>
			resultMap.get(cardId) || {
				card_id: cardId,
				card_resume_id: null,
				current_usage_amount: 0,
				card_expense_count: 0,
			}
	);

	return results;
};
