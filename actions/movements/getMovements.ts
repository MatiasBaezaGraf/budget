"use server";

import { createClient } from "@/utils/supabase/server";
import { Movement } from "@/utils/types/movement";

export interface GetMovementsParams {
	from?: Date;
	to?: Date;
	limit?: number;
}

export const getMovements = async (params: GetMovementsParams = {}) => {
	const supabase = await createClient();
	// Build the query
	let query = supabase
		.from("movements_with_category")
		.select("*")
		.order("date", { ascending: false });

	// Apply filters only if parameters are provided
	if (params.from) {
		query = query.gte("date", params.from.toISOString());
	}

	if (params.to) {
		query = query.lte("date", params.to.toISOString());
	}

	if (params.limit) {
		query = query.limit(params.limit);
	}

	const { data, error } = await query;

	if (error) {
		throw new Error(error.message);
	}

	return data as Movement[];
};
