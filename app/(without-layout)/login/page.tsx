import { LoginForm } from "@/components/login/LoginForm";
import { login } from "@/actions/auth/login";

export default function LoginPage() {
	return <LoginForm login={login} />;
}
