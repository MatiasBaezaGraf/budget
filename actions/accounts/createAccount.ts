"use server";

import { createClient } from "@/utils/supabase/server";
import { AccountType } from "@/utils/types/account";
import { FlowType } from "@/utils/types/movement";

interface CreateAccountParams {
	name: string;
	type: AccountType;
	initial_amount?: number;
}

export const createAccount = async (params: CreateAccountParams) => {
	const supabase = await createClient();

	// Crear la cuenta
	const { data: accountData, error: accountError } = await supabase
		.from("Accounts")
		.insert([
			{
				name: params.name,
				type: params.type,
				currency: "Pesos",
			},
		])
		.select();

	if (accountError) {
		throw new Error(accountError.message);
	}

	const newAccount = accountData[0];

	// Si hay initial_amount, crear movimiento inicial
	if (params.initial_amount && params.initial_amount > 0) {
		const { error: movementError } = await supabase.from("Movements").insert([
			{
				amount: params.initial_amount,
				flow: FlowType.INCOME,
				description: "Inicializacion de cuenta",
				account_id: newAccount.id,
				category_id: 5,
				date: new Date().toISOString(),
				previous_account_balance: 0,
				current_account_balance: params.initial_amount,
			},
		]);

		if (movementError) {
			throw new Error(movementError.message);
		}
	}

	return newAccount;
};
