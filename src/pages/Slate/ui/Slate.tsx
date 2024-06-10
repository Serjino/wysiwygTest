import { defaultTheme } from "../../../app/styles/theme/theme";
import { FlexWrapper } from "../../../shared/ui/flexWrapper/FlexWrapper";
import RichTextExample from "../plugins/richText";

export function Slate() {
	return (
		<FlexWrapper
			column
			style={{
				width: "50%",
				margin: "0 auto",
				background: "white",
				padding: defaultTheme.getSpacing(2),
				borderRadius: defaultTheme.getSpacing(1),
			}}
		>
			<RichTextExample />
		</FlexWrapper>
	);
}
