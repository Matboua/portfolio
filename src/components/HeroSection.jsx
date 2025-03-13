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
	Target,
	User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Cursor, Typewriter } from "react-simple-typewriter";
import { useState } from "react";

export default function HeroSection() {
	const { i18n, t } = useTranslation();
	const [cvFiles] = useState({
		en: "/pdf/Oussama_Matboua_CV_FR.pdf",
		de: "/pdf/Oussama_Matboua_Lebenslauf.pdf",
		fr: "/pdf/Oussama_Matboua_CV_FR.pdf",
	});
	return (
		<section className="min-h-[calc(100dvh-76px)] flex items-center justify-center w-full py-4 sm:py-8">
			<div className="flex items-center justify-center w-full px-5 md:px-0 md:w-11/12 lg:w-10/12">
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-3">
						<div className="flex gap-3">
							<div className="relative flex w-fit">
								<div className="before:content-[''] before:absolute before:top-0 before:left-0 before:w-[103%] before:h-[103%] before:bg-gradient-to-r before:from-pink-700 before:to-blue-700 before:rounded-full"></div>
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
						<p className="font-bold text-xl xs:text-2xl lg:text-4xl text-nowrap">
							{t("hero.Hello, I'm")} Oussama Matboua
						</p>
						<div className="flex text-lg xs:text-xl lg:text-2xl">
							<span>
								<Typewriter
									words={[
										t("hero.Full Stack Developer"),
										t("hero.Problem Solver"),
										t("hero.Software Developer"),
									]}
									loop={true}
									typeSpeed={100}
								/>
							</span>
							<span className="text-pink-600 font-bold">
								<Cursor />
							</span>
						</div>
						<p className="dark:text-neutral-400 text-neutral-700">
							{t("hero.description")}
						</p>
					</div>
					<div className="flex flex-col gap-3">
						<div className="flex gap-4 items-center">
							<User size={20} className="text-blue-600" />

							<p>{t("hero.birthday")}</p>
						</div>
						<div className="flex gap-4 items-center">
							<Mail size={20} className="text-blue-600" />
							<a href="mailto:matbouaoussama@gmail.com">
								matbouaoussama@gmail.com
							</a>
						</div>
						<div className="flex gap-4 items-center">
							<Phone size={20} className="text-blue-600" />
							<a href="tel:+212605776855">+212 605-776-855</a>
						</div>
					</div>
					<div className="flex gap-3 items-center">
						<a
							href={cvFiles[i18n.language]}
							download
							className="flex gap-3 items-center dark:bg-neutral-800 bg-neutral-400 text-neutral-100 pl-5 pr-6 py-3 rounded-full bg-gradient-to-r from-blue-700 to-pink-700 border border-neutral-100 dark:border-neutral-100"
						>
							<FileUser size={20} />
							{t("hero.Download CV")}
						</a>
						<a
							href="#"
							target="_blank"
							className="dark:bg-neutral-800 bg-white border border-neutral-400 dark:border-neutral-600 dark:text-neutral-100 text-neutral-800 p-2.5 rounded-full"
						>
							<Github size={23} />
						</a>
						<a
							href="#"
							target="_blank"
							className="dark:bg-neutral-800 bg-white border border-neutral-400 dark:border-neutral-600 dark:text-neutral-100 text-neutral-800 p-2.5 rounded-full"
						>
							<Linkedin size={23} />
						</a>
					</div>
					<div className="flex justify-start gap-1.5 sm:gap-3 items-center">
						<div className="flex gap-1 sm:gap-3 items-center text-sm dark:bg-neutral-800 bg-white border border-neutral-400 dark:border-neutral-600 dark:text-neutral-100 text-neutral-800 pl-2.5 md:pl-4 pr-2.5 md:pr-5 py-2.5 rounded-full">
							<CodeXml size={20} />
							<p>Front-End</p>
						</div>
						<div className="flex gap-1 sm:gap-3 items-center text-sm dark:bg-neutral-800 bg-white border border-neutral-400 dark:border-neutral-600 dark:text-neutral-100 text-neutral-800 pl-2.5 md:pl-4 pr-2.5 md:pr-5 py-2.5 rounded-full">
							<Database size={20} />
							<p>Back-End</p>
						</div>
						<div className="flex gap-1 sm:gap-3 items-center text-sm dark:bg-neutral-800 bg-white border border-neutral-400 dark:border-neutral-600 dark:text-neutral-100 text-neutral-800 pl-2.5 md:pl-4 pr-2.5 md:pr-5 py-2.5 rounded-full">
							<Command size={20} />
							<p>Full-Stack</p>
						</div>
					</div>
				</div>
				<div className="hidden md:block">
					<Lottie
						animationData={laptopAnimation}
						className="md:w-[450px] lg:w-[600px] mt-20 -mr-30"
					/>
				</div>
			</div>
		</section>
	);
}
