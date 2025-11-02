import { getMovements } from "@/actions/movements/getMovements";
import { getAccountsBalances } from "@/actions/accounts/getAccountsBalances";
import { getAccountsMetadata } from "@/actions/accounts/getAccountsMetadata";
import { HomeClientManager } from "@/components/home/HomeClientManager";

export default function Home() {
	return (
		<HomeClientManager
			getMovements={getMovements}
			getAccountsBalances={getAccountsBalances}
			getAccountsMetadata={getAccountsMetadata}
		/>
	);
}
