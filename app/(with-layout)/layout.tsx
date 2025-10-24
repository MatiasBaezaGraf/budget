import { TaskBar } from "@/components/layout/TaskBar";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative antialiased min-h-screen p-4">
			{children}
			<TaskBar />
		</div>
	);
}
