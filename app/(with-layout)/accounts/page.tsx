import { getAccountsBalances } from "@/actions/accounts/getAccountsBalances";
import { getAccountsMetadata } from "@/actions/accounts/getAccountsMetadata";
import { AccountsClientManager } from "@/components/accounts/AccountsClientManager";

export default function AccountsPage() {
	return (
		<AccountsClientManager
			getAccountsMetadata={getAccountsMetadata}
			getAccountsBalances={getAccountsBalances}
		/>
	);
}
