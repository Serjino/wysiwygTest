import styled, { CSSObject } from "@emotion/styled";
import { ITypographyProps } from "./Typography.def";

export const Typography = styled.p<ITypographyProps>`
	${({ variant = 'body', theme }) => {
		let targetStyles = {} as CSSObject;
		switch (variant) {
			case "h1":
				targetStyles = {
					fontSize: 32,
					fontWeight: 500,
				};
				break;
			case "h2":
				targetStyles = {
					fontSize: 28,
					fontWeight: 500,
				};
				break;
			case "h3":
				targetStyles = {
					fontSize: 24,
					fontWeight: 400,
				};
				break;
			case "body":
				targetStyles = {
					fontSize: 16,
					fontWeight: 400,
				};
				break;
			case "subtitle":
				targetStyles = {
					fontSize: 14,
					fontWeight: 400,
				};
				break;
		}
		return { ...targetStyles, color: theme.colors.text.main };
	}}
`;
