import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
	name: keyof typeof Icons;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
	const LucideIcon = Icons[name];

	// console.log("DynamicIcon", name, LucideIcon)

	if (!LucideIcon || typeof LucideIcon !== "object") {
		return <Icons.Ban className="opacity-10"></Icons.Ban>;
	}

	const ValidIcon = LucideIcon as unknown as React.ElementType;

	return <ValidIcon {...props} />;
}
