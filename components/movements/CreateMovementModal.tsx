"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Props = {
	open: boolean;
	onClose: () => void;
	categoryId?: number;
	accountId?: number;
	amount?: number;
};

export function CreateMovementModal({
	open,
	onClose,
	categoryId,
	accountId,
	amount,
}: Props) {
	const supabase = createClient();

	const [categories, setCategories] = useState<
		{ id: number; name: string }[] | null
	>(null);
	const [accounts, setAccounts] = useState<
		{ id: number; name: string }[] | null
	>(null);

	const [form, setForm] = useState({
		description: "",
		amount: amount ?? 0,
		category_id: categoryId ?? undefined,
		account_id: accountId ?? undefined,
		flow: "expense",
	});

	const [loading, setLoading] = useState(false);

	// Cargar categorías y cuentas (solo una vez)
	useEffect(() => {
		if (!open) return;

		const fetchData = async () => {
			const { data: cats } = await supabase
				.from("Categories")
				.select("id, name")
				.order("name", { ascending: true });

			const { data: accs } = await supabase
				.from("Accounts")
				.select("id, name")
				.order("name", { ascending: true });

			if (cats) setCategories(cats);
			if (accs) setAccounts(accs);
		};

		fetchData();
	}, [open, supabase]);

	const handleSubmit = async () => {
		if (!form.amount || !form.account_id) return;

		setLoading(true);

		const { error } = await supabase.from("Movements").insert([
			{
				amount: form.amount,
				description: form.description,
				category_id: form.category_id ?? null,
				account_id: form.account_id,
				flow: form.flow,
				date: new Date().toISOString(),
			},
		]);

		setLoading(false);

		if (error) {
			alert("Error al crear movimiento: " + error.message);
			return;
		}

		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Nuevo movimiento</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-4 mt-2">
					<div>
						<Label>Descripción</Label>
						<Input
							value={form.description}
							onChange={(e) =>
								setForm({ ...form, description: e.target.value })
							}
							placeholder="Ej: Verdulería, luz, etc."
						/>
					</div>

					<div>
						<Label>Monto</Label>
						<Input
							type="number"
							value={form.amount}
							onChange={(e) =>
								setForm({ ...form, amount: parseFloat(e.target.value) })
							}
						/>
					</div>

					<div>
						<Label>Cuenta</Label>
						<Select
							value={form.account_id?.toString() ?? ""}
							onValueChange={(v) =>
								setForm({ ...form, account_id: parseInt(v) })
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccionar cuenta" />
							</SelectTrigger>
							<SelectContent>
								{accounts?.map((acc) => (
									<SelectItem key={acc.id} value={acc.id.toString()}>
										{acc.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>Categoría</Label>
						<Select
							value={form.category_id?.toString() ?? ""}
							onValueChange={(v) =>
								setForm({ ...form, category_id: parseInt(v) })
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Sin categoría" />
							</SelectTrigger>
							<SelectContent>
								{categories?.map((cat) => (
									<SelectItem key={cat.id} value={cat.id.toString()}>
										{cat.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>Tipo de movimiento</Label>
						<Select
							value={form.flow}
							onValueChange={(v) => setForm({ ...form, flow: v })}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="expense">Gasto</SelectItem>
								<SelectItem value="income">Ingreso</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button disabled={loading} onClick={handleSubmit} className="mt-3">
						{loading ? "Guardando..." : "Guardar movimiento"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
