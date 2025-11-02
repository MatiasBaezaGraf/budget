"use client";

import { useState } from "react";
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
import { createAccount } from "@/actions/accounts/createAccount";
import { getAccountsMetadata } from "@/actions/accounts/getAccountsMetadata";
import { useCacheStore } from "@/stores/useCacheStore";
import { AccountType } from "@/utils/types/account";

type Props = {
	open: boolean;
	onClose: () => void;
};

export function CreateAccountModal({ open, onClose }: Props) {
	const [form, setForm] = useState({
		name: "",
		type: AccountType.BANK.toString(),
		initial_amount: "",
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (!form.name) return;

		setLoading(true);

		try {
			await createAccount({
				name: form.name,
				type: parseInt(form.type) as AccountType,
				initial_amount: form.initial_amount
					? parseFloat(form.initial_amount)
					: undefined,
			});

			// Invalidar caché y refetch
			useCacheStore.getState().clearAccounts();
			const newAccounts = await getAccountsMetadata();
			useCacheStore.getState().setAccounts(newAccounts);

			// Trigger refetch general (balances, etc.)
			useCacheStore.getState().triggerRefetch();

			// Resetear formulario
			setForm({
				name: "",
				type: AccountType.BANK.toString(),
				initial_amount: "",
			});

			onClose();
		} catch (error) {
			alert(
				"Error al crear cuenta: " +
					(error instanceof Error ? error.message : "Error desconocido")
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Nueva cuenta</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-4 mt-2">
					<div>
						<Label>Nombre</Label>
						<Input
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							placeholder="Ej: Cuenta Corriente, Efectivo, etc."
						/>
					</div>

					<div>
						<Label>Tipo de cuenta</Label>
						<Select
							value={form.type}
							onValueChange={(v) => setForm({ ...form, type: v })}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={AccountType.BANK.toString()}>
									Banco
								</SelectItem>
								<SelectItem value={AccountType.CASH.toString()}>
									Efectivo
								</SelectItem>
								<SelectItem value={AccountType.WALLET.toString()}>
									Billetera
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>Monto inicial (opcional)</Label>
						<Input
							type="number"
							value={form.initial_amount}
							onChange={(e) =>
								setForm({ ...form, initial_amount: e.target.value })
							}
							placeholder="0.00"
							step="0.01"
						/>
					</div>

					<Button disabled={loading} onClick={handleSubmit} className="mt-3">
						{loading ? "Guardando..." : "Guardar cuenta"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
