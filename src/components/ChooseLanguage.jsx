import { useState } from "react";
import Flag from "react-world-flags";

export default function ChooseLanguage() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState({
		code: "GB",
		label: "En",
	});
	const languages = [
		{ code: "GB", label: "En" },
		{ code: "DE", label: "De" },
		{ code: "FR", label: "Fr" },
	];
	return (
		<div className="relative z-20">
			<button
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				className="w-24 sm:w-32 flex justify-center items-center cursor-pointer gap-2 border dark:border-gray-600 hover:dark:bg-white/15 hover:bg-gray-400/10 border-gray-400 p-2 rounded-2xl bg-white/10"
			>
				<Flag
					code={selectedLanguage.code}
					className="w-6"
					alt={`${selectedLanguage.label} Flag`}
				/>
				{selectedLanguage.label}
			</button>
			{isOpen && (
				<div
					id="languages"
					className="w-24 sm:w-32 absolute top-11.5 dark:bg-gray-700/90 bg-gray-100 border border-gray-400 dark:border-gray-600 rounded-2xl overflow-hidden"
				>
					{languages.map((lang) => (
						<button
							onClick={() => {
								setSelectedLanguage({ code: lang.code, label: lang.label });
								setIsOpen(!isOpen);
							}}
							key={lang.code}
							className="w-full flex justify-center items-center cursor-pointer gap-2 border-b border-gray-400 dark:border-gray-600 backdrop-blur-lg hover:dark:bg-white/15 hover:bg-gray-200 py-2"
						>
							<Flag
								code={lang.code}
								className="w-6"
								alt={`${lang.label} Flag`}
							/>
							{lang.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
