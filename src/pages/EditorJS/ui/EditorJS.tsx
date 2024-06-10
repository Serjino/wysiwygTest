import { createReactEditorJS } from "react-editor-js";

const ReactEditorJS = createReactEditorJS();

export function EditorJS() {
	return (
		<ReactEditorJS
			defaultValue={{
				blocks: [
					{
						type: "paragraph",
						data: {
							text: "The example of text that was written in <b>one of popular</b> text editors.",
						},
					},
					{
						type: "header",
						data: {
							text: "With the header of course",
							level: 2,
						},
					},
					{
						type: "paragraph",
						data: {
							text: "So what do we have?",
						},
					},
				],
			}}
		/>
	);
}
