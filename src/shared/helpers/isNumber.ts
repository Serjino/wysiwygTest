export function isNumber(value: number) {
	return typeof value === "number" && !isNaN(value);
}
