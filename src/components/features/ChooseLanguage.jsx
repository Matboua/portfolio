import { useState } from "react";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

export default function ChooseLanguage() {
	// Change back Language
	const { i18n } = useTranslation();
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};
	// Change front Language
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState({
		code: "DE",
		label: "Deutsch",
	});
	const languages = [
		{ code: "DE", label: "Deutsch" },
		{ code: "GB", label: "English" },
		{ code: "FR", label: "Français" },
	];
	return (
		<div className="relative z-20">
			<button
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				className="xs:w-32 flex justify-center items-center cursor-pointer gap-2 border border-gray-400 p-2 rounded-2xl dark:border-gray-500 hover:dark:bg-white/15 hover:bg-neutral-200/80 dark:bg-white/10 bg-neutral-200/40 "
			>
				<Flag
					code={selectedLanguage.code}
					className="w-6"
					alt={`${selectedLanguage.label} Flag`}
				/>
				<span className="hidden xs:inline-block">{selectedLanguage.label}</span>
				<span className="xs:hidden">
					{selectedLanguage.label.substring(0, 2)}
				</span>
				{/* {selectedLanguage.label} */}
			</button>
			{isOpen && (
				<div
					id="languages"
					className="w-32 absolute top-11.5 dark:bg-neutral-700/90 bg-gray-100 border border-gray-400 dark:border-gray-500 rounded-2xl overflow-hidden"
				>
					{languages.map((lang) => (
						<button
							onClick={() => {
								setSelectedLanguage({ code: lang.code, label: lang.label });
								setIsOpen(!isOpen);
								changeLanguage(lang.label.slice(0, 2).toLocaleLowerCase());
							}}
							key={lang.code}
							className={`w-full flex justify-center items-center cursor-pointer gap-2 backdrop-blur-lg hover:dark:bg-white/15 hover:bg-gray-200 py-2 ${
								lang == languages[languages.length - 1]
									? ""
									: " border-b border-gray-400 dark:border-gray-500"
							}`}
						>
							<Flag
								code={lang.code}
								className="w-6"
								alt={`${lang.label} Flage`}
							/>
							<span className="hidden xs:inline-block">{lang.label}</span>
							<span className="xs:hidden">{lang.label.substring(0, 2)}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
