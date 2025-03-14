import { useTranslation } from "react-i18next";

export default function About() {
	const { t } = useTranslation();
	return (
		<section className="h-screen flex flex-col justify-center items-center px-5">
			<h1 className="text-2xl sm:text-5xl">🙏 {t("coming.title")}</h1>
			<p className="opacity-80 mt-1 text-center">{t("coming.description")}</p>
		</section>
	);
}
