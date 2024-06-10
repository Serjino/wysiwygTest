export interface ThemeInstance {
	spacing: number;
	colors: { text: { main: string }; primary: string; background: string };
	spaces: { sectionX: string; sectionY: string };
	getSpacing: (number: number) => string;
}
