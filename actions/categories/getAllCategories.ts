"use server";

import { createClient } from "@/utils/supabase/server";
import { Category } from "@/utils/types/category";

export const getAllCategories = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("Categories").select("*");

	if (error) {
		throw new Error(error.message);
	}

	return data as Category[];
};
