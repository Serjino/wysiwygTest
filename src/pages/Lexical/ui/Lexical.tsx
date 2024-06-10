import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
	InitialConfigType,
	LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import './style.css'
import theme from "./theme";


function onError(error: any) {
	console.error(error);
}

function Placeholder() {
	return <div className="editor-placeholder">Enter some rich text...</div>;
}


export function Lexical() {

	const editorConfig: InitialConfigType = {
		namespace: "React.js Demo",
		nodes: [],
		// Handling of errors during update
		onError(error: Error) {
			throw error;
		},
		// The editor theme
		theme: theme,
	};
	

	return (
		<LexicalComposer initialConfig={editorConfig}>
			<div className="editor-container">
				<ToolbarPlugin />
				<div className="editor-inner">
					<RichTextPlugin
						contentEditable={<ContentEditable className="editor-input" />}
						placeholder={<Placeholder />}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoFocusPlugin />
					<TreeViewPlugin />
				</div>
			</div>
		</LexicalComposer>
	);
}
