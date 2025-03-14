import About from "./components/About";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
export default function App() {
	return (
		<div className="w-full dark:text-neutral-300 text-neutral-800 dark:bg-neutral-900 bg-neutral-100 pt-[76px] overflow-x-hidden  flex flex-col items-center">
			<Header />
			<HeroSection />
			<About />
		</div>
	);
}
