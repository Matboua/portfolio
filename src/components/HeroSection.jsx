import Lottie from "lottie-react";
import laptopAnimation from "../../public/animation/laptop.json";
import {
	BadgeCheck,
	CodeXml,
	Command,
	Database,
	FileUser,
	Github,
	Linkedin,
	Mail,
	Phone,
	User,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
	const { t } = useTranslation();
	return (
		<section className="min-h-[calc(100vh-76px)] flex items-center justify-center w-full py-8 md:py-0">
			<div className="flex items-center justify-center  w-10/12">
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-3">
						<div className="flex gap-3">
							<div className="relative flex w-fit">
								<div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-[103%] before:h-[103%] before:bg-gradient-to-r before:from-pink-900 before:to-blue-900 before:rounded-full"></div>
								<img
									src="/me.png"
									alt="Matboua Profile"
									className="w-24 rounded-full ml-0.5 mt-0.5 border-2 border-neutral-100 dark:border-neutral-900 z-10"
								/>
							</div>
							<BadgeCheck
								size={18}
								className="self-end -ml-2  bg-blue-600  text-neutral-100 rounded-full"
							/>
						</div>
						<p className="font-medium text-5xl">
							{t("hero.Hello, I'm")} Oussama Matboua
						</p>
						<p className="text-2xl">{t("hero.Full Stack Developer")}</p>
						<p className="text-2xl">{t("hero.Problem Solver")}</p>
						<p className="text-2xl">{t("hero.Software Developer")}</p>
						<p className="dark:text-neutral-400 text-neutral-700">
							{t("hero.description")}
						</p>
					</div>
					<div className="flex flex-col gap-3">
						<div className="flex gap-4 items-center">
							<Phone size={20} className="text-blue-600" />
							<p>{t("hero.02/05/2002")}</p>
						</div>
						<div className="flex gap-4 items-center">
							<User size={20} className="text-blue-600" />
							<a href="mailto:matbouaoussama@gmail.com">
								matbouaoussama@gmail.com
							</a>
						</div>
						<div className="flex gap-4 items-center">
							<Mail size={20} className="text-blue-600" />
							<a href="tel:+212605776855">+212 605-776-855</a>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<a
							href="#"
							className="flex gap-3 items-center dark:bg-neutral-800 bg-neutral-400 text-neutral-100 pl-5 pr-6 py-3 rounded-full bg-gradient-to-r from-blue-900  to-pink-600/50 border border-neutral-100"
						>
							<FileUser size={20} />
							<p>{t("hero.Download CV")}</p>
						</a>
						<a
							href="#"
							className="dark:bg-neutral-800 bg-neutral-400 text-neutral-100 p-3 rounded-full"
						>
							<Github size={23} />
						</a>
						<a
							href="#"
							className="dark:bg-neutral-800 bg-neutral-400 text-neutral-100 p-3 rounded-full"
						>
							<Linkedin size={23} />
						</a>
					</div>
					<div className="flex gap-3 items-center">
						<div className="flex gap-3 items-center text-sm dark:bg-neutral-800 bg-neutral-400 text-neutral-100 pl-4 pr-5 py-2 rounded-full">
							<CodeXml size={20} />
							<p>Front-End</p>
						</div>
						<div className="flex gap-3 items-center text-sm dark:bg-neutral-800 bg-neutral-400 text-neutral-100 pl-4 pr-5 py-2 rounded-full">
							<Database size={20} />
							<p>Back-End</p>
						</div>
						<div className="flex gap-3 items-center text-sm dark:bg-neutral-800 bg-neutral-400 text-neutral-100 pl-4 pr-5 py-2 rounded-full">
							<Command size={20} />
							<p>Full-Stack</p>
						</div>
					</div>
				</div>
				<div className="hidden md:block">
					<Lottie
						animationData={laptopAnimation}
						className="w-[600px] mt-20 -mr-30"
					/>
				</div>
			</div>
		</section>
	);
}
