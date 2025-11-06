"use client";

import { useCachedData } from "@/hooks/useCachedData";
import { useCacheStore } from "@/stores/useCacheStore";
import { Card as CardModel, CurrentResumeUsage } from "@/utils/types/card";
import { Account } from "@/utils/types/account";
import { Button } from "../ui/button";
import { CreditCard, Loader2, Plus } from "lucide-react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Progress } from "../ui/progress";
import { useEffect, useState } from "react";

export const CardsClientManager = ({
	getAllCards,
	getAccountsMetadata,
	getCardsCurrentResumeUsage,
}: {
	getAllCards: () => Promise<CardModel[]>;
	getAccountsMetadata: () => Promise<Account[]>;
	getCardsCurrentResumeUsage: (
		cardIds: number[]
	) => Promise<CurrentResumeUsage[]>;
}) => {
	const [currentResumeUsage, setCurrentResumeUsage] = useState<
		CurrentResumeUsage[] | null
	>(null);
	const cachedCards = useCachedData<CardModel>("cards", getAllCards);
	const cachedAccounts = useCachedData<Account>(
		"accounts",
		getAccountsMetadata
	);

	// Combinar cards con nombres de cuentas vinculadas y current resume usage
	const cardsWithAccountNames: CardModel[] | null =
		cachedCards && cachedAccounts
			? cachedCards.map((card) => ({
					...card,
					linked_account_name:
						cachedAccounts.find(
							(acc) => parseInt(acc.id) === card.linked_account_id
						)?.name || "Sin cuenta vinculada",
					current_resume_usage: currentResumeUsage?.find(
						(usage) => usage.card_id === parseInt(card.id)
					),
			  }))
			: null;

	useEffect(() => {
		if (cachedCards) {
			getCardsCurrentResumeUsage(
				cachedCards.map((card) => parseInt(card.id))
			).then((currentResumeUsage) => {
				setCurrentResumeUsage(currentResumeUsage);
			});
		}
	}, [cachedCards, getCardsCurrentResumeUsage]);

	return (
		<div className="flex flex-col items-center justify-center w-full gap-6">
			<div className="flex items-center justify-between w-full">
				<div className="flex flex-col items-start">
					<h1 className="text-3xl font-bold">Tarjetas</h1>
					<p className="text-sm text-white/50">Gestiona tus tarjetas</p>
				</div>
				<Button
					size="icon"
					variant="glass"
					// onClick={() => openModal("createAccount", {})}
				>
					<Plus className="size-4" />
				</Button>
			</div>

			{cardsWithAccountNames != null ? (
				<div className="flex flex-col items-center justify-center w-full gap-2">
					{cardsWithAccountNames?.map((card) => {
						const currentUsage =
							card.current_resume_usage?.current_usage_amount || 0;
						const percentage =
							card.limit_amount > 0
								? (currentUsage / card.limit_amount) * 100
								: 0;

						return (
							<Card
								key={card.id}
								className="w-full items-center flex-col gap-3"
							>
								<div className="flex w-full justify-between items-center gap-4">
									<div className="flex items-center gap-2">
										<div className="flex items-center justify-center p-3 bg-white/10 rounded-xl">
											<CreditCard className="size-6" />
										</div>
										<div className="flex flex-col items-start">
											<h2 className="text-lg text-white font-bold">
												{card.name}
											</h2>
											<p className="text-sm text-white/50">
												{card.linked_account_name}
											</p>
										</div>
									</div>
								</div>
								<div className="flex flex-col w-full gap-2">
									<div className="flex items-center justify-between">
										<p className="text-sm text-white/50">Consumido</p>
										<div className="flex items-center gap-2">
											{currentResumeUsage !== null ? (
												<p className="text-sm font-medium">
													${currentUsage.toLocaleString()}
												</p>
											) : (
												<Skeleton className="w-18 h-4" />
											)}

											<p className="text-sm font-medium">
												/ ${card.limit_amount.toLocaleString()}
											</p>
										</div>
									</div>
									<Progress value={percentage} className="h-2" />
									<div className="flex justify-between items-center">
										{currentResumeUsage !== null ? (
											<p className="text-xs text-white/50">
												{percentage.toFixed(1)}% usado
											</p>
										) : (
											<Skeleton className="w-18 h-3 mb-1" />
										)}
										{currentResumeUsage === null && (
											<Skeleton className="w-14 h-3 mb-1" />
										)}
										{card.current_resume_usage &&
											card.current_resume_usage.card_expense_count > 0 && (
												<p className="text-xs text-white/50">
													{card.current_resume_usage.card_expense_count} gasto
													{card.current_resume_usage.card_expense_count !== 1
														? "s"
														: ""}
												</p>
											)}
									</div>
								</div>
							</Card>
						);
					})}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center w-full gap-2">
					<Skeleton className="w-full h-20 rounded-xl" />
					<Skeleton className="w-full h-20 rounded-xl" />
				</div>
			)}
		</div>
	);
};
