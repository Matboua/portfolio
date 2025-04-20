export default function Project({ image, name, description, lang1, lang2 }) {
	return (
		<div className="dark:bg-neutral-900 bg-white border-2 dark:border-neutral-700 border-gray-300 rounded-md overflow-hidden shadow-md shadow-neutral-700/10 h-fit hover:rotate-2 hover:scale-101 transition-all duration-300 cursor-pointer group">
			<div
				style={{ backgroundImage: `url(/projects/${image})` }}
				className="rounded-tl-md rounded-tr-md h-[200px] w-full bg-cover bg-center"
			>
				{/* <img src={`/projects/${image}`} alt="Carvoy React" className="w-full" /> */}
			</div>
			<div className="p-5 flex flex-col gap-1">
				{/* Title + description */}
				<p className="font-medium">{name}</p>
				<p className="text-sm line-clamp-2">{description}</p>
				{/* Languages */}
				<div className="flex gap-2 mt-2">
					<p className="flex gap-1 sm:gap-3 items-center text-sm dark:bg-neutral-800 bg-neutral-50 border border-neutral-400 dark:border-neutral-600 dark:text-neutral-100 text-neutral-800 pl-2.5 md:pl-4 pr-2.5 md:pr-5 py-2 rounded-md text-nowrap">
						{lang1}
					</p>
					<p className="flex gap-1 sm:gap-3 items-center text-sm dark:bg-neutral-800 bg-neutral-50 border border-neutral-400 dark:border-neutral-600 dark:text-neutral-100 text-neutral-800 pl-2.5 md:pl-4 pr-2.5 md:pr-5 py-2 rounded-md text-nowrap">
						{lang2}
					</p>
				</div>
			</div>
		</div>
	);
}
