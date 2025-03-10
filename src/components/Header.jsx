import { Logs } from "lucide-react";
import ChooseLanguage from "./features/ChooseLanguage";
import Mode from "./features/Mode";
import { useState } from "react";
import Menu from "./features/Menu";
export default function Header() {
	const [isNav, setIsNav] = useState(false);
	return (
		<header
			className={`fixed top-0 flex justify-center w-full pt-4 bg-white/55 dark:bg-gray-900/80 backdrop-blur-sm  before:content-[''] before:absolute before:top-0 before:cursor-pointer  before:-left-[100%] before:w-full before:h-full before:bg-gradient-to-r dark:before:from-gray-700/10 dark:before:via-gray-700/20 dark:before:to-gray-700/10  before:from-gray-300/10 before:via-gray-300/20 before:to-gray-300/10 hover:before:-left-[-100%] before:transition-all before:duration-500 after:content[''] after:absolute after:bottom-0 after:left-[-13%] after:w-[126%] after:rounded-full after:h-[2.5px] after:bg-gradient-to-r after:from-pink-900 after:to-blue-900 after:transition-all after:duration-700 ${
				isNav ? "pb-3" : "pb-4.5"
			}`}
		>
			<section className="flex items-center flex-col w-full">
				<div className="flex w-full px-5 md:px-0 md:w-11/12 lg:w-10/12 justify-between items-center">
					<div className="logo">
						<a
							href="#"
							className="text-xl font-bold flex items-center lg:gap-5 bg-gradient-to-r from-blue-900  to-pink-600  text-transparent bg-clip-text"
						>
							<span>&lt; Matboua.</span>
							<span> /&gt;</span>
						</a>
					</div>
					<div className="flex md:justify-between flex-row-reverse md:flex-row gap-2 grow font-medium">
						<span className="hidden md:inline-block"></span>
						<nav className="flex md:gap-6 lg:gap-12">
							<div className="hidden md:flex items-center md:gap-6 lg:gap-14">
								<a
									href="#home"
									className="relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:-bottom-1 before:left-[-13%] before:w-0 hover:before:w-[126%] before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700"
								>
									Home
								</a>
								<a
									href="#about"
									className="relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:-bottom-1 before:left-[-13%] before:w-0 hover:before:w-[126%] before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700"
								>
									About
								</a>
								<a
									href="#experience"
									className="relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:-bottom-1 before:left-[-13%] before:w-0 hover:before:w-[126%] before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700"
								>
									Experience
								</a>
								<a
									href="#projects"
									className="relative hover:bg-gradient-to-r hover:from-pink-900 hover:to-blue-900 hover:text-transparent hover:bg-clip-text before:content[''] before:absolute before:-bottom-1 before:left-[-13%] before:w-0 hover:before:w-[126%] before:rounded-full before:h-[2.5px] hover:before:bg-gradient-to-r hover:before:from-pink-600 hover:before:to-blue-900 before:transition-all before:duration-700"
								>
									Projects
								</a>
							</div>
							<button
								onClick={() => {
									setIsNav(!isNav);
								}}
								className="cursor-pointer border dark:border-gray-500 border-gray-400 p-2.5 rounded-full bg-white/10 hover:bg-white/15 "
							>
								<Logs size={20} strokeWidth={2.75} />
							</button>
						</nav>
						<div className="lang-dark flex items-center gap-2 md:gap-3.5 lg:gap-8">
							<ChooseLanguage />
							<Mode />
						</div>
					</div>
				</div>
				{isNav && <Menu />}
			</section>
		</header>
	);
}
