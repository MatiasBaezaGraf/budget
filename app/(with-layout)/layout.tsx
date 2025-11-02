import { TaskBar } from "@/components/layout/TaskBar";
import { GlobalModals } from "@/components/layout/GlobalModals";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative antialiased min-h-screen p-4 pb-28">
			{children}
			<GlobalModals />
			<TaskBar />
		</div>
	);
}
