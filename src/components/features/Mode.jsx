import { MoonStar, Sun } from "lucide-react";
import { useState } from "react";
export default function Mode() {
	const [isDark, setIsDark] = useState(true);
	return (
		<button
			onClick={() => {
				setIsDark(!isDark);
				document.documentElement.classList.toggle("dark");
			}}
			className="border cursor-pointer dark:border-gray-500 border-gray-400 p-2.5 rounded-full  hover:dark:bg-white/15 hover:bg-neutral-200/80 dark:bg-white/10 bg-neutral-200/40 "
		>
			{isDark && <Sun size={20} color="orange" />}
			{!isDark && <MoonStar size={20} color="#1c398e" />}
		</button>
	);
}
