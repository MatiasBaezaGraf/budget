"use server";

import { createClient } from "@/utils/supabase/server";
import { AccountBalance } from "@/utils/types/account";

export const getAccountsBalances = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("accounts_with_balance")
		.select("id, balance");

	if (error) {
		throw new Error(error.message);
	}

	return data as AccountBalance[];
};
