"use client";

import { useCachedData } from "@/hooks/useCachedData";
import { useCacheStore } from "@/stores/useCacheStore";
import { Card as CardModel } from "@/utils/types/card";
import { Account } from "@/utils/types/account";
import { Button } from "../ui/button";
import { CreditCard, Loader2, Plus } from "lucide-react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CardsClientManager = ({
	getAllCards,
	getAccountsMetadata,
}: {
	getAllCards: () => Promise<CardModel[]>;
	getAccountsMetadata: () => Promise<Account[]>;
}) => {
	const cachedCards = useCachedData<CardModel>("cards", getAllCards);
	const cachedAccounts = useCachedData<Account>(
		"accounts",
		getAccountsMetadata
	);

	// Combinar cards con nombres de cuentas vinculadas
	const cardsWithAccountNames: CardModel[] | null =
		cachedCards && cachedAccounts
			? cachedCards.map((card) => ({
					...card,
					linked_account_name:
						cachedAccounts.find(
							(acc) => parseInt(acc.id) === card.linked_account_id
						)?.name || "Sin cuenta vinculada",
			  }))
			: null;

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
					{cardsWithAccountNames?.map((card) => (
						<Card key={card.id} className="w-full items-center flex-col gap-2">
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
						</Card>
					))}
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
