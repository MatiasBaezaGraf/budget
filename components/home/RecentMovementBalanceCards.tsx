"use client";

import { FlowType, Movement } from "@/utils/types";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/utils/utils";
import { GetMovementsParams } from "@/actions/movements/getMovements";

export const RecentMovementBalanceCards = ({
	movements,
}: {
	movements: Movement[] | null;
}) => {
	const income =
		movements === null
			? null
			: movements
					.filter((movement) => movement.flow === FlowType.INCOME)
					.reduce((acc, movement) => acc + movement.amount, 0);
	const expense =
		movements === null
			? null
			: movements
					.filter((movement) => movement.flow === FlowType.EXPENSE)
					.reduce((acc, movement) => acc + movement.amount, 0);

	return (
		<div className="grid w-full grid-cols-2 gap-6">
			<Card className="col-span-1">
				{income == null && <Loader2 className="w-4 h-4 animate-spin" />}
				{income != null && (
					<div className="flex gap-2 items-center">
						<div className="flex flex-col items-start">
							<div className="flex gap-2 items-center">
								<div className="flex items-center justify-center">
									<TrendingUp className="size-4 text-success" />
								</div>
								<p className="text-sm text-white/50 font-medium">Ingresos</p>
							</div>
							<p className="text-lg font-bold">$ {formatCurrency(income)}</p>
							<p className="text-xs text-white/50 font-medium">En mes actual</p>
						</div>
					</div>
				)}
			</Card>
			<Card className="col-span-1">
				{expense == null && <Loader2 className="w-4 h-4 animate-spin" />}
				{expense != null && (
					<div className="flex gap-2 items-center">
						<div className="flex flex-col items-start">
							<div className="flex gap-2 items-center">
								<div className="flex items-center justify-center">
									<TrendingDown className="size-4 text-destructive" />
								</div>
								<p className="text-sm text-white/50 font-medium">Egresos</p>
							</div>
							<p className="text-lg font-bold">$ {formatCurrency(expense)}</p>
							<p className="text-xs text-white/50 font-medium">En mes actual</p>
						</div>
					</div>
				)}
			</Card>
		</div>
	);
};
