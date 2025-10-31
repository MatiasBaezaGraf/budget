"use server";

import { createClient } from "@/utils/supabase/server";
import { Account } from "@/utils/types/account";

export const getAccounts = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("accounts_with_balance")
		.select("*");

	if (error) {
		throw new Error(error.message);
	}

	return data as Account[];
};
