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
			className="border cursor-pointer dark:border-gray-500 border-gray-400 p-2.5 rounded-full bg-white/10 hover:dark:bg-white/15 hover:bg-gray-400/10"
		>
			{isDark && <Sun size={20} color="orange" />}
			{!isDark && <MoonStar size={20} color="#1c398e" />}
		</button>
	);
}
