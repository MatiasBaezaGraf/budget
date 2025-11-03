"use server";

import { createClient } from "@/utils/supabase/server";
import { Card } from "@/utils/types/card";

export const getAllCards = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("Cards").select("*");

	if (error) {
		throw new Error(error.message);
	}

	return data as Card[];
};
