import { FlowType, Movement } from "@/utils/types/movement";
import { Card } from "../ui/card";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/utils/utils";
import { DynamicIcon } from "../ui/dynamic-icon";
import { format } from "date-fns";
import { Skeleton } from "../ui/skeleton";

export const RecentMovementsCard = ({
	movements,
}: {
	movements: Movement[] | null;
}) => {
	return (
		<Card className="w-full items-start gap-4">
			<h2 className="text-2xl font-bold">Movimientos Recientes</h2>

			{movements != null ? (
				<div className="flex flex-col gap-4 items-stretch w-full">
					{movements.slice(0, 4).map((movement) => (
						<Card
							key={movement.id}
							className="flex flex-row items-center justify-between gap-2 rounded-xl p-4 w-full"
						>
							<div className="flex flex-row items-center gap-2">
								<div className="flex items-center justify-center p-2 bg-white/10 rounded-xl">
									<DynamicIcon
										name={movement.category_icon as any}
										className="size-5 text-white/70"
									/>
								</div>
								<div className="flex flex-col items-start">
									<h3 className="text-lg leading-5 font-medium">
										{movement.category_name}
									</h3>
									<p className="text-xs text-white/50 line-clamp-1">
										{movement.description}
									</p>
								</div>
							</div>

							<div className="flex flex-col items-end">
								<p
									className={`text-lg font-bold  text-nowrap ${
										movement.flow === FlowType.INCOME
											? "text-success"
											: "text-destructive"
									}`}
								>
									{movement.flow === FlowType.INCOME ? "+" : "-"}$
									{formatCurrency(movement.amount)}
								</p>
								<p className="text-xs text-white/50">
									{format(new Date(movement.date), "dd/MM")}
								</p>
							</div>
						</Card>
					))}
				</div>
			) : (
				<div className="flex flex-col gap-4 items-stretch w-full">
					<Skeleton className="w-full h-20 rounded-xl" />
					<Skeleton className="w-full h-20 rounded-xl" />
					<Skeleton className="w-full h-20 rounded-xl" />
					<Skeleton className="w-full h-20 rounded-xl" />
				</div>
			)}
		</Card>
	);
};
