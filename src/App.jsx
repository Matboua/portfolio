import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
export default function App() {
	return (
		<div className="dark:text-neutral-300 text-neutral-800 dark:bg-neutral-900 bg-neutral-100 min-h-[200vh] pt-[76px]">
			<Header />
			<HeroSection />
		</div>
	);
}
