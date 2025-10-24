"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AuthError } from "@supabase/supabase-js";
import { Card } from "../ui/card";
import { Sparkles } from "lucide-react";

export const LoginForm = ({
	login,
}: {
	login: (credentials: FormData) => Promise<{
		error: AuthError;
	}>;
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({
		message: "",
		show: false,
	});

	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		setLoading(true);

		e.preventDefault();

		const formData = new FormData();

		formData.append("email", credentials.email);
		formData.append("password", credentials.password);

		const res = await login(formData);

		if (res.error) {
			setError({
				message: "Email o contraseña incorrectos.",
				show: true,
			});
		}

		setLoading(false);
	};

	return (
		<div className="p-4 flex items-center justify-center w-full min-h-screen">
			<Card className="w-full max-w-md p-8">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center justify-start  gap-4 w-full "
				>
					<div className="flex p-6 rounded-3xl bg-white/10 border border-white/10">
						<Sparkles className="w-10 h-10 text-white" />
					</div>
					<div className="flex flex-col items-center justify-start gap-2 w-full mb-4">
						<h1 className="text-3xl font-bold">Iniciar Sesión</h1>
						<span className="text-sm text-white/50">
							Ingrese para continuar
						</span>
					</div>

					<Input
						type="email"
						placeholder="matiasbaezagraf@gmail.com"
						label="Email"
						value={credentials.email}
						onChange={(e) =>
							setCredentials({ ...credentials, email: e.target.value })
						}
					/>
					<Input
						type="password"
						label="Contraseña"
						placeholder="••••••••••"
						value={credentials.password}
						onChange={(e) =>
							setCredentials({ ...credentials, password: e.target.value })
						}
					/>
					{error.show && (
						<p className="text-red-500 text-sm">{error.message}</p>
					)}
					<Button
						type="submit"
						disabled={loading}
						variant="outline"
						size="lg"
						className="w-full mt-10 bg-linear-to-br"
					>
						{loading ? "Logging in..." : "Login"}
					</Button>
				</form>
			</Card>
		</div>
	);
};
