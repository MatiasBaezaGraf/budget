"use client";

import { useCachedData } from "@/hooks/useCachedData";
import {
	Account,
	AccountBalance,
	AccountType,
	AccountTypeLabel,
} from "@/utils/types/account";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { formatCurrency } from "@/utils/utils";
import { DynamicIcon } from "../ui/dynamic-icon";
import { AccountTypeIconName } from "@/utils/types/account";
import { useModalStore } from "@/stores/useModalStore";
import { useCacheStore } from "@/stores/useCacheStore";

export const AccountsClientManager = ({
	getAccountsMetadata,
	getAccountsBalances,
}: {
	getAccountsMetadata: () => Promise<Account[]>;
	getAccountsBalances: () => Promise<AccountBalance[]>;
}) => {
	const { openModal } = useModalStore();

	const [balances, setBalances] = useState<
		{ id: string; balance: number }[] | null
	>(null);

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
		setBalances(null);
		// Cargar balances
		getAccountsBalances().then((balances) => {
			setBalances(balances);
		});
	}, [refetchTrigger, getAccountsBalances]);

	return (
		<div className="flex flex-col items-center justify-center w-full gap-6">
			<div className="flex items-center justify-between w-full">
				<div className="flex flex-col items-start">
					<h1 className="text-3xl font-bold">Cuentas</h1>
					<p className="text-sm text-white/50">Gestiona tus cuentas</p>
				</div>
				<Button
					size="icon"
					variant="glass"
					onClick={() => openModal("createAccount", {})}
				>
					<Plus className="size-4" />
				</Button>
			</div>

			<Card className="w-full items-center gap-2">
				<h2 className="text-base text-white/50">Balance Total</h2>
				<p className="text-3xl font-bold">
					${" "}
					{formatCurrency(
						balances?.reduce((acc, balance) => acc + balance.balance, 0) || 0
					)}
				</p>
			</Card>

			<div className="flex flex-col items-center justify-center w-full gap-2">
				{accounts == null && (
					<Card className="w-full items-center flex-row justify-between gap-2">
						<Loader2 className="w-4 h-4 animate-spin" />
					</Card>
				)}
				{accounts?.map((account) => (
					<Card
						key={account.id}
						className="w-full items-center flex-row justify-between gap-2"
					>
						<div className="flex flex-row items-center gap-4">
							<div className="flex items-center justify-center p-3 bg-white/10 rounded-xl">
								<DynamicIcon
									name={AccountTypeIconName[account.type] as any}
									className="size-6"
								/>
							</div>
							<div className="flex flex-col items-start">
								<h2 className="text-lg text-white">{account.name}</h2>
								<p className="text-sm text-white/50">
									{AccountTypeLabel[account.type]}
								</p>
								<p className="text-xl font-bold">
									$ {formatCurrency(account.balance || 0)}
								</p>
							</div>
						</div>
						<div className="flex flex-row items-center gap-2">
							<Button size="icon" variant="glass">
								<Pencil className="size-4" />
							</Button>
							<Button size="icon" variant="glass">
								<Trash className="size-4" />
							</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};
