import Project from "./Project";

export default function Projects() {
	return (
		<section className="min-h-[calc(100dvh-76px)] flex justify-center w-full py-5 sm:py-8">
			<div className="flex flex-col items-center gap-16 w-full px-5 md:px-0 md:w-11/12 lg:w-10/12">
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-7 sm:gap-x-8 justify-center">
					<a
						href="#"
						className="w-35 xs:w-40 border cursor-pointer dark:border-gray-500 border-gray-400 py-3 sm:py-3.5 text-center rounded  hover:dark:bg-white/10 hover:bg-neutral-100 dark:bg-neutral-800 bg-white"
					>
						All Projects
					</a>
					<a
						href="#"
						className="w-35 xs:w-40 border cursor-pointer dark:border-gray-500 border-gray-400 py-3 sm:py-3.5 text-center rounded  hover:dark:bg-white/10 hover:bg-neutral-100 dark:bg-neutral-800 bg-white"
					>
						Front-End
					</a>
					<a
						href="#"
						className="w-35 xs:w-40 border cursor-pointer dark:border-gray-500 border-gray-400 py-3 sm:py-3.5 text-center rounded  hover:dark:bg-white/10 hover:bg-neutral-100 dark:bg-neutral-800 bg-white"
					>
						Back-End
					</a>
					<a
						href="#"
						className="w-35 xs:w-40 col-span-1 sm:col-span-2 justify-self-center border cursor-pointer dark:border-gray-500 border-gray-400 py-3 sm:py-3.5 text-center rounded  hover:dark:bg-white/10 hover:bg-neutral-100 dark:bg-neutral-800 bg-white"
					>
						Full-Stack
					</a>
					<a
						href="#"
						className="w-35 xs:w-40 ml-0 sm:-ml-[calc(100%+32px)] justify-self-center border cursor-pointer dark:border-gray-500 border-gray-400 py-3 sm:py-3.5 text-center rounded  hover:dark:bg-white/10 hover:bg-neutral-100 dark:bg-neutral-800 bg-white"
					>
						Python
					</a>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lx:grid-cols-3 2xl:grid-cols-4 gap-7 justify-center md:justify-between">
					<Project
						image="carvoy_react.png"
						name="Carvoy Car Rental"
						description="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem"
						lang1="React"
						lang2="Tailwind"
					/>
					<Project
						image="carvoy_react.png"
						name="Carvoy Car Rental"
						description="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem"
						lang1="React"
						lang2="Tailwind"
					/>
					<Project
						image="carvoy_react.png"
						name="Carvoy Car Rental"
						description="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem"
						lang1="React"
						lang2="Tailwind"
					/>
					<Project
						image="carvoy_react.png"
						name="Carvoy Car Rental"
						description="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem"
						lang1="React"
						lang2="Tailwind"
					/>
				</div>
			</div>
		</section>
	);
}
