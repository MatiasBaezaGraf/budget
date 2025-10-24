# Ejemplos de uso de tipos con relaciones opcionales

## 1. Obtener solo datos básicos (sin relaciones)

```typescript
// app/actions/accounts/getAccountsBasic.ts
import { createClient } from "@/utils/supabase/server";
import type { Account } from "@/utils/types";

export async function getAccountsBasic(): Promise<Account[]> {
	const supabase = await createClient();

	const { data, error } = await supabase.from("accounts").select("*");

	if (error) throw error;
	return data as Account[];
}
```

## 2. Obtener cuentas con movimientos

```typescript
// app/actions/accounts/getAccountsWithMovements.ts
import { createClient } from "@/utils/supabase/server";
import type { Account } from "@/utils/types";

export async function getAccountsWithMovements(): Promise<Account[]> {
	const supabase = await createClient();

	const { data, error } = await supabase.from("accounts").select(`
      *,
      movements (*)
    `);

	if (error) throw error;
	return data as Account[];
}
```

## 3. Obtener cuentas con todas las relaciones

```typescript
// app/actions/accounts/getAccountsWithAll.ts
import { createClient } from "@/utils/supabase/server";
import type { Account } from "@/utils/types";

export async function getAccountsWithAll(): Promise<Account[]> {
	const supabase = await createClient();

	const { data, error } = await supabase.from("accounts").select(`
      *,
      movements (*),
      cards (*),
      transfers_from:transfers!from_account_id (*),
      transfers_to:transfers!to_account_id (*)
    `);

	if (error) throw error;
	return data as Account[];
}
```

## 4. Obtener movimientos con relaciones

```typescript
// app/actions/movements/getMovementsWithDetails.ts
import { createClient } from "@/utils/supabase/server";
import type { Movement } from "@/utils/types";

export async function getMovementsWithDetails(): Promise<Movement[]> {
	const supabase = await createClient();

	const { data, error } = await supabase.from("movements").select(`
      *,
      account (*),
      category (*)
    `);

	if (error) throw error;
	return data as Movement[];
}
```

## 5. Obtener tarjetas con cuenta vinculada

```typescript
// app/actions/cards/getCardsWithAccount.ts
import { createClient } from "@/utils/supabase/server";
import type { Card } from "@/utils/types";

export async function getCardsWithAccount(): Promise<Card[]> {
	const supabase = await createClient();

	const { data, error } = await supabase.from("cards").select(`
      *,
      linked_account:accounts!linked_account_id (*)
    `);

	if (error) throw error;
	return data as Card[];
}
```

## 6. Uso en componentes

```typescript
// components/dashboard/AccountList.tsx
import type { Account } from "@/utils/types";

interface Props {
	accounts: Account[];
}

export function AccountList({ accounts }: Props) {
	return (
		<div>
			{accounts.map((account) => (
				<div key={account.id}>
					<h3>{account.name}</h3>
					<p>Balance: ${account.balance}</p>

					{/* TypeScript sabe que movements puede estar o no */}
					{account.movements && <p>Movimientos: {account.movements.length}</p>}

					{/* También funciona con optional chaining */}
					<p>Tarjetas: {account.cards?.length ?? 0}</p>
				</div>
			))}
		</div>
	);
}
```

## 7. Relaciones anidadas complejas

```typescript
// app/actions/cards/getCardsComplete.ts
import { createClient } from "@/utils/supabase/server";
import type { Card } from "@/utils/types";

export async function getCardsComplete(): Promise<Card[]> {
	const supabase = await createClient();

	const { data, error } = await supabase.from("cards").select(`
      *,
      linked_account:accounts!linked_account_id (*),
      card_resumes (
        *,
        card_expenses (*)
      ),
      installment_purchases (
        *,
        card_expenses (*)
      )
    `);

	if (error) throw error;
	return data as Card[];
}
```

## 8. Filtrar y ordenar con relaciones

```typescript
// app/actions/movements/getRecentMovementsWithDetails.ts
import { createClient } from "@/utils/supabase/server";
import type { Movement } from "@/utils/types";

export async function getRecentMovementsWithDetails(): Promise<Movement[]> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("movements")
		.select(
			`
      *,
      account (*),
      category (*)
    `
		)
		.order("date", { ascending: false })
		.limit(20);

	if (error) throw error;
	return data as Movement[];
}
```

## 9. Acceder a relaciones de forma segura

```typescript
// Uso en componente
function MovementItem({ movement }: { movement: Movement }) {
	// Option 1: Con optional chaining
	const accountName = movement.account?.name;

	// Option 2: Con validación explícita
	if (movement.account) {
		console.log(movement.account.name); // TypeScript sabe que existe
	}

	// Option 3: Con valor por defecto
	const categoryName = movement.category?.name ?? "Sin categoría";

	return (
		<div>
			<p>{movement.description}</p>
			<p>Cuenta: {accountName}</p>
			<p>Categoría: {categoryName}</p>
		</div>
	);
}
```

## Ventajas de este enfoque:

1. **Simplicidad**: Un solo tipo por entidad, sin múltiples variantes
2. **Type Safety**: TypeScript conoce todas las posibles propiedades
3. **Flexibilidad**: Las relaciones opcionales se adaptan a cualquier query
4. **DRY**: No hay duplicación de tipos
5. **Compatible con Supabase**: Los nombres coinciden exactamente con la BD
6. **Auto-completado**: El IDE sugiere todas las relaciones posibles
