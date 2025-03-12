import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./languages/en/translation.json";
import de from "./languages/de/translation.json";
import fr from "./languages/fr/translation.json";

i18next.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		de: { translation: de },
		fr: { translation: fr },
	},
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18next;
