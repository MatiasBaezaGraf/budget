import { useEffect } from "react";
import { useCacheStore } from "@/stores/useCacheStore";

type CacheKey = "accounts" | "categories" | "cards" | "recurringExpenses";

export const useCachedData = <T,>(
	cacheKey: CacheKey,
	fetchFn: () => Promise<T[]>
) => {
	const cached = useCacheStore((state) => state[cacheKey]);
	const setData = useCacheStore((state) => {
		const setters = {
			accounts: state.setAccounts,
			categories: state.setCategories,
			cards: state.setCards,
			recurringExpenses: state.setRecurringExpenses,
		};
		return setters[cacheKey];
	});

	useEffect(() => {
		if (!cached) {
			fetchFn().then(setData as any);
		}
	}, [cached, setData, fetchFn]);

	return cached as T[] | null;
};

