import Project from "./Project";

export default function Projects() {
	return (
		<main className="min-h-[calc(100dvh-76px)] flex justify-center w-full py-5 sm:py-8">
			<div className="flex flex-col md:flex-row gap-5 w-full px-5 md:px-0 md:w-11/12 lg:w-10/12">
				{/* Left Section */}
				<section className="flex flex-row flex-wrap justify-center md:justify-start md:flex-col gap-2">
					<button className="dark:bg-neutral-800 bg-white hover:bg-neutral-300 dark:hover:bg-neutral-700 min-[400px]:px-10 px-5 py-3 rounded-md cursor-pointertext-nowrap w-[calc(50%-24px)] min-[400px]:w-44 border-2 border-pink-700">
						<span className="opacity-100">All Projects</span>
					</button>
					<button className="dark:bg-neutral-800 bg-white hover:bg-neutral-300 dark:hover:bg-neutral-700 min-[400px]:px-10 px-5 py-3 rounded-md cursor-pointertext-nowrap w-[calc(50%-24px)] min-[400px]:w-44">
						<span className="opacity-50">React</span>
					</button>
					<button className="dark:bg-neutral-800 bg-white hover:bg-neutral-300 dark:hover:bg-neutral-700 min-[400px]:px-10 px-5 py-3 rounded-md cursor-pointertext-nowrap w-[calc(50%-24px)] min-[400px]:w-44">
						<span className="opacity-50">Next.js</span>
					</button>
					<button className="dark:bg-neutral-800 bg-white hover:bg-neutral-300 dark:hover:bg-neutral-700 min-[400px]:px-10 px-5 py-3 rounded-md cursor-pointertext-nowrap w-[calc(50%-24px)] min-[400px]:w-44">
						<span className="opacity-50">Laravel</span>
					</button>
					<button className="dark:bg-neutral-800 bg-white hover:bg-neutral-300 dark:hover:bg-neutral-700 min-[400px]:px-10 px-5 py-3 rounded-md cursor-pointertext-nowrap w-[calc(50%-24px)] min-[400px]:w-44">
						<span className="opacity-50">Woordpress</span>
					</button>
				</section>
				{/* Right section */}
				<section className="grid grid-cols-1 xm:grid-cols-2 xl:grid-cols-3 gap-5">
					<Project
						image="skoolution_nextjs.webp"
						name="Carvoy Car Rental"
						description="An educational platform for high school students in Morocco, providing online assessment and learning tools."
						lang1="Next.js"
						lang2="Tailwind"
					/>
					<Project
						image="carvoy_react.webp"
						name="Carvoy Car Rental"
						description="CarVoy – A reliable and user-friendly car rental platform for seamless booking and management."
						lang1="React"
						lang2="Tailwind"
					/>
					<Project
						image="portfolio_react.webp"
						name="<Matboua. /> Portfolio"
						description="A personal portfolio website with a modern design, showcasing skills and professional experience."
						lang1="React"
						lang2="Tailwind"
					/>
					<Project
						image="ShopLead_Python.webp"
						name="Shop Lead"
						description="A desktop inventory management application for tracking products, categories, and sales."
						lang1="Python"
						lang2="Tikinter"
					/>
				</section>
			</div>
		</main>
	);
}
