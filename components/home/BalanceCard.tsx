"use client";

import { Account } from "@/utils/types/account";
import { Card } from "../ui/card";
import { formatCurrency } from "@/utils/utils";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

interface BalanceData {
	totalBalance: number;
	accountNumber: number;
}

export const BalanceCard = ({ accounts }: { accounts: Account[] | null }) => {
	const balanceData: BalanceData | null = accounts
		? {
				totalBalance: accounts?.reduce(
					(acc, account) => acc + (account.balance || 0),
					0
				),
				accountNumber: accounts?.length,
		  }
		: null;

	return (
		<Card className="w-full items-center gap-4">
			<div className="flex flex-col w-full items-start justify-center">
				<span className="text-sm text-white/50">Liquidez Total</span>
				{balanceData ? (
					<h2 className="text-4xl font-bold">
						${formatCurrency(balanceData.totalBalance)}
					</h2>
				) : (
					<Skeleton className="w-[200px] h-8 my-1" />
				)}
			</div>
			<Separator />
			<div className="flex flex-col w-full items-start justify-center">
				<span className="text-sm text-white/50">Número de cuentas</span>
				{balanceData ? (
					<h2 className="text-lg font-bold">{balanceData.accountNumber}</h2>
				) : (
					<Skeleton className="size-4 my-1.5" />
				)}
			</div>
		</Card>
	);
};
