"use client";

import { Account } from "@/utils/types/account";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/utils/utils";
import { Separator } from "../ui/separator";

interface BalanceData {
	totalBalance: number;
	accountNumber: number;
}

export const BalanceCard = ({
	getAccounts,
}: {
	getAccounts: () => Promise<Account[]>;
}) => {
	const [balanceData, setBalanceData] = useState<BalanceData | null>(null);

	useEffect(() => {
		getAccounts().then((accounts) => {
			setBalanceData({
				totalBalance: accounts.reduce(
					(acc, account) => acc + account.balance,
					0
				),
				accountNumber: accounts.length,
			});
		});
	}, []);

	return (
		<Card className="w-full items-center gap-4">
			{balanceData == null && <Loader2 className="w-4 h-4 animate-spin" />}
			{balanceData != null && (
				<>
					<div className="flex flex-col w-full items-start justify-center">
						<span className="text-sm text-white/50">Liquidez Total</span>
						<h2 className="text-4xl font-bold">
							$ {formatCurrency(balanceData.totalBalance)}
						</h2>
					</div>
					<Separator />
					<div className="flex flex-col w-full items-start justify-center">
						<span className="text-sm text-white/50">Número de cuentas</span>
						<h2 className="text-lg font-bold">{balanceData.accountNumber}</h2>
					</div>
				</>
			)}
		</Card>
	);
};
