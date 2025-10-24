import { BalanceCard } from "@/components/home/BalanceCard";
import { getAccounts } from "@/actions/accounts/getAccounts";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center w-full gap-6">
			{/* <div className="flex flex-col items-center justify-center w-full gap-1">
				<h1 className="text-4xl font-bold text-white">Finanzas</h1>
				<span className="text-sm text-white/80">Gestiona tu dinero</span>
			</div> */}

			<BalanceCard getAccounts={getAccounts} />
		</div>
	);
}
