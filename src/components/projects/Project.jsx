export default function Project({ image, name, description, lang1, lang2 }) {
	return (
		<div className="p-2 dark:bg-neutral-900 bg-white border-2 dark:border-neutral-700 border-gray-300 rounded-lg overflow-hidden w-[300px] shadow-md shadow-neutral-700/10">
			<img
				src={`/projects/${image}`}
				alt="Carvoy React"
				className="rounded-lg border-2 dark:border-neutral-700 border-gray-300 h-[172px]"
			/>
			<div className="p-2 flex flex-col gap-1">
				{/* Title + description */}
				<p className="font-medium">{name}</p>
				<p className="text-sm line-clamp-2">{description}</p>
				{/* Languages */}
				<div className="flex gap-2 mt-2">
					<p className="flex gap-1 sm:gap-3 items-center text-sm dark:bg-neutral-800 bg-neutral-50 border border-neutral-400 dark:border-neutral-600 dark:text-neutral-100 text-neutral-800 pl-2.5 md:pl-4 pr-2.5 md:pr-5 py-1 rounded-full text-nowrap">
						{lang1}
					</p>
					<p className="flex gap-1 sm:gap-3 items-center text-sm dark:bg-neutral-800 bg-neutral-50 border border-neutral-400 dark:border-neutral-600 dark:text-neutral-100 text-neutral-800 pl-2.5 md:pl-4 pr-2.5 md:pr-5 py-1 rounded-full text-nowrap">
						{lang2}
					</p>
				</div>
			</div>
		</div>
	);
}
