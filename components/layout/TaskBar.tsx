"use client";

import { cn } from "@/utils/utils";
import { CalendarIcon, CreditCard, HomeIcon, ListIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const TaskBar = () => {
	const pathname = usePathname();

	return (
		<div className="fixed flex flex-row items-center justify-between bottom-0 left-0 right-0 bg-linear-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border-white/10 border-t rounded-3xl p-2 h-18 m-4">
			<Link
				href="/"
				className="basis-1/4 h-full flex items-center justify-center"
			>
				<Button
					variant="glass"
					className="flex-col items-center w-full h-full rounded-2xl"
				>
					<HomeIcon className="w-6 h-6 text-white" />
					<span className="text-xs text-white">Inicio</span>
				</Button>
			</Link>
			<Link
				href="/accounts"
				className="basis-1/4 h-full flex items-center justify-center"
			>
				<Button
					variant="link"
					className="flex-col items-center w-full h-full rounded-2xl"
				>
					<ListIcon className="w-6 h-6 text-white/50" />
					<span className="text-xs text-white/50">Cuentas</span>
				</Button>
			</Link>
			<Link
				href="/cards"
				className="basis-1/4 h-full flex items-center justify-center"
			>
				<Button
					variant="link"
					className="flex-col items-center w-full h-full rounded-2xl"
				>
					<CreditCard className="w-6 h-6 text-white/50" />
					<span className="text-xs text-white/50">Tarjetas</span>
				</Button>
			</Link>

			<Link
				href="/monthly"
				className="basis-1/4 h-full flex items-center justify-center"
			>
				<Button
					variant="link"
					className="flex-col items-center w-full h-full rounded-2xl"
				>
					<CalendarIcon className="w-6 h-6 text-white/50" />
					<span className="text-xs text-white/50">Mensuales</span>
				</Button>
			</Link>
		</div>
	);
};
