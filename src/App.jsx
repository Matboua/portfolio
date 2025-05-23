import About from "./components/About";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Projects from "./components/projects/Projects";
export default function App() {
	return (
		<div className="w-full dark:text-neutral-100 text-neutral-800 dark:bg-neutral-900 bg-neutral-100 pt-[76px] overflow-x-hidden  flex flex-col items-center">
			<Header />
			<HeroSection />
			<Projects />
			<About />
		</div>
	);
}
