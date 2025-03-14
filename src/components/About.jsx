import { useTranslation } from "react-i18next";

export default function About() {
	const { t } = useTranslation();
	return (
		<section className="h-screen flex flex-col justify-center items-center">
			<h1 className="text-5xl">{t("coming.title")}</h1>
			<p className="opacity-80 mt-1">{t("coming.description")}</p>
		</section>
	);
}
