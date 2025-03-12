import { useTranslation } from "react-i18next";

export default function Menu() {
	const { t } = useTranslation();
	return (
		<div className="flex justify-center w-full">
			<div className="w-10/12 px-6 flex flex-col pt-4 font-medium">
				<a
					href="#home"
					className="md:hidden relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:bottom-3 before:-left-2 before:w-0 hover:before:w-16 before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700 hover:after:content[''] hover:after:absolute hover:after:top-0 hover:after:-left-[5%] after:rounded-xl after:w-0 hover:after:w-[110%] hover:after:h-[100%] dark:hover:after:bg-gray-500/10 hover:after:bg-gray-700/10 after:transition-all after:duration-500 pt-2.5 pb-4 capitalize"
				>
					{t("header.home")}
				</a>
				<a
					href="#about"
					className="md:hidden relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:bottom-3 before:-left-2 before:w-0 hover:before:w-16 before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700 hover:after:content[''] hover:after:absolute hover:after:top-0 hover:after:-left-[5%] after:rounded-xl after:w-0 hover:after:w-[110%]  hover:after:h-[100%] dark:hover:after:bg-gray-500/10 hover:after:bg-gray-700/10 after:transition-all after:duration-500 pt-2.5 pb-4 capitalize"
				>
					{t("header.about")}
				</a>
				<a
					href="#experience"
					className="md:hidden relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:bottom-3 before:-left-2 before:w-0 hover:before:w-23.5 before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700 hover:after:content[''] hover:after:absolute hover:after:top-0 hover:after:-left-[5%] after:rounded-xl after:w-0 hover:after:w-[110%]  hover:after:h-[100%] dark:hover:after:bg-gray-500/10 hover:after:bg-gray-700/10 after:transition-all after:duration-500 pt-2.5 pb-4 capitalize"
				>
					{t("header.experience")}
				</a>
				<a
					href="#projects"
					className="md:hidden relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:bottom-3 before:-left-2 before:w-0 hover:before:w-18.5 before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700 hover:after:content[''] hover:after:absolute hover:after:top-0 hover:after:-left-[5%] after:rounded-xl after:w-0 hover:after:w-[110%]  hover:after:h-[100%] dark:hover:after:bg-gray-500/10 hover:after:bg-gray-700/10 after:transition-all after:duration-500 pt-2.5 pb-4 capitalize"
				>
					{t("header.projects")}
				</a>
				<a
					href="#skills"
					className="relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:bottom-3 before:-left-2 before:w-0 hover:before:w-14 before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700 hover:after:content[''] hover:after:absolute hover:after:top-0 hover:after:-left-[5%] after:rounded-xl after:w-0 hover:after:w-[110%]  hover:after:h-[100%] dark:hover:after:bg-gray-500/10 hover:after:bg-gray-700/10 after:transition-all after:duration-500 pt-2.5 pb-4 capitalize"
				>
					{t("header.skills")}
				</a>
				<a
					href="#education"
					className="relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:bottom-3 before:-left-2 before:w-0 hover:before:w-22.5 before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700 hover:after:content[''] hover:after:absolute hover:after:top-0 hover:after:-left-[5%] after:rounded-xl after:w-0 hover:after:w-[110%]  hover:after:h-[100%] dark:hover:after:bg-gray-500/10 hover:after:bg-gray-700/10 after:transition-all after:duration-500 pt-2.5 pb-4 capitalize"
				>
					{t("header.education")}
				</a>
				<a
					href="#contact"
					className="relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:bottom-3.5 before:-left-2 before:w-0 hover:before:w-18.5 before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700 hover:after:content[''] hover:after:absolute hover:after:top-0 hover:after:-left-[5%] after:rounded-xl after:w-0 hover:after:w-[110%]  hover:after:h-[100%] dark:hover:after:bg-gray-500/10 hover:after:bg-gray-700/10 after:transition-all after:duration-500 pt-2 pb-5 capitalize"
				>
					{t("header.contact")}
				</a>
			</div>
		</div>
	);
}
