import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Account } from "@/utils/types/account";
import type { Card } from "@/utils/types/card";
import type { Category } from "@/utils/types/category";
import type { RecurringExpense } from "@/utils/types/recurringExpense";

interface CacheStore {
	// Cached data
	accounts: Account[] | null;
	categories: Category[] | null;
	cards: Card[] | null;
	recurringExpenses: RecurringExpense[] | null;

	// Refetch trigger global (no se persiste)
	refetchTrigger: number;

	// Setters
	setAccounts: (data: Account[]) => void;
	setCategories: (data: Category[]) => void;
	setCards: (data: Card[]) => void;
	setRecurringExpenses: (data: RecurringExpense[]) => void;

	// Trigger refetch general
	triggerRefetch: () => void;

	// Invalidation
	clearAccounts: () => void;
	clearCategories: () => void;
	clearCards: () => void;
	clearRecurringExpenses: () => void;
	clearAll: () => void;
}

export const useCacheStore = create<CacheStore>()(
	persist(
		(set) => ({
			// Initial state
			accounts: null,
			categories: null,
			cards: null,
			recurringExpenses: null,
			refetchTrigger: 0,

			// Setters
			setAccounts: (data) => set({ accounts: data }),
			setCategories: (data) => set({ categories: data }),
			setCards: (data) => set({ cards: data }),
			setRecurringExpenses: (data) => set({ recurringExpenses: data }),

			// Trigger refetch general
			triggerRefetch: () =>
				set((state) => ({ refetchTrigger: state.refetchTrigger + 1 })),

			// Invalidation
			clearAccounts: () => set({ accounts: null }),
			clearCategories: () => set({ categories: null }),
			clearCards: () => set({ cards: null }),
			clearRecurringExpenses: () => set({ recurringExpenses: null }),
			clearAll: () =>
				set({ accounts: null, cards: null, recurringExpenses: null }),
		}),
		{
			name: "app-cache",
			// No persistir el trigger de refetch
			partialize: (state) => ({
				accounts: state.accounts,
				categories: state.categories,
				cards: state.cards,
				recurringExpenses: state.recurringExpenses,
			}),
		}
	)
);
