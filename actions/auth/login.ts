"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(credentials: FormData) {
	const supabase = await createClient();
	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: credentials.get("email") as string,
		password: credentials.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		return { error };
	}

	revalidatePath("/", "layout");
	redirect("/");
}
