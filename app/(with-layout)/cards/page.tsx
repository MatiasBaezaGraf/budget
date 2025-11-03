import { getAllCards } from "@/actions/cards/getAllCards";
import { getAccountsMetadata } from "@/actions/accounts/getAccountsMetadata";
import { CardsClientManager } from "@/components/cards/CardsClientManager";

export default function CardsPage() {
	return (
		<CardsClientManager
			getAllCards={getAllCards}
			getAccountsMetadata={getAccountsMetadata}
		/>
	);
}
