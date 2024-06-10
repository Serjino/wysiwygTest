import { isNumber } from "../../../shared/helpers/isNumber";
import { ThemeInstance } from "./theme.def";

function getThemeInstance(): ThemeInstance {
	const spacing = 8;
	function getSpacing(number: number): string {
		const targetValue = !isNumber(number) ? 0 : number * spacing;
		return targetValue + "px";
	}

	return {
		getSpacing: getSpacing,
		spacing: 8,
		colors: {
			text: {
				main: "#000000",
			},
			primary: "#0070f3",
			background: "#f5f5f5",
		},
		spaces: {
			sectionX: getSpacing(6),
			sectionY: getSpacing(3),
		},
	};
}

export const defaultTheme = getThemeInstance();
