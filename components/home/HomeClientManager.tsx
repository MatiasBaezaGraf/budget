"use client";

import { BalanceCard } from "./BalanceCard";
import { RecentMovementBalanceCards } from "./RecentMovementBalanceCards";

import { GetMovementsParams } from "@/actions/movements/getMovements";

import { Account, AccountBalance } from "@/utils/types/account";
import { Movement } from "@/utils/types/movement";
import { useEffect, useState } from "react";
import { RecentMovementsCard } from "./RecentMovementsCard";
import { useCachedData } from "@/hooks/useCachedData";
import { useCacheStore } from "@/stores/useCacheStore";

export const HomeClientManager = ({
	getMovements,
	getAccountsBalances,
	getAccountsMetadata,
}: {
	getMovements: (params: GetMovementsParams) => Promise<Movement[]>;
	getAccountsBalances: () => Promise<AccountBalance[]>;
	getAccountsMetadata: () => Promise<Account[]>;
}) => {
	const [balances, setBalances] = useState<
		{ id: string; balance: number }[] | null
	>(null);
	const [currentMonthMovements, setCurrentMonthMovements] = useState<
		Movement[] | null
	>(null);
	const [recentMovements, setRecentMovements] = useState<Movement[] | null>(
		null
	);
	// Usar cache para metadata de cuentas
	const cachedAccounts = useCachedData<Account>(
		"accounts",
		getAccountsMetadata
	);

	// Combinar metadata con balances
	const accounts: Account[] | null =
		cachedAccounts && balances
			? cachedAccounts.map((account) => ({
					...account,
					balance: balances.find((b) => b.id === account.id)?.balance || 0,
			  }))
			: null;

	// Escuchar el trigger de refetch (se ejecuta al montar y cuando cambia)
	const refetchTrigger = useCacheStore((state) => state.refetchTrigger);

	useEffect(() => {
		// Cargar balances
		getAccountsBalances().then((balances) => {
			setBalances(balances);
		});

		// Cargar movimientos
		const now = new Date();
		const firstDayOfMonth = new Date(
			now.getFullYear(),
			now.getMonth(),
			1,
			0,
			0,
			0,
			0
		);

		getMovements({
			from: firstDayOfMonth,
			to: new Date(),
		}).then((movements) => {
			setCurrentMonthMovements(movements);
		});

		getMovements({
			limit: 5,
		}).then((movements) => {
			setRecentMovements(movements);
		});
	}, [refetchTrigger, getAccountsBalances, getMovements]);

	return (
		<div className="flex flex-col items-center justify-center w-full gap-6">
			<BalanceCard accounts={accounts} />
			<RecentMovementBalanceCards movements={currentMonthMovements} />
			<RecentMovementsCard movements={recentMovements} />
		</div>
	);
};
