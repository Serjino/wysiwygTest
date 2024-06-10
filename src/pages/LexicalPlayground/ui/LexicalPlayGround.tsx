import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import PlaygroundApp from "../../../lexical-playground/src/App";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { InputEditorWrapper } from "../../ui/InputEditorWrapper";
import "./index.css";
import "./myStyleOverrides.css";
import { OutputDataWrapper } from "../../ui/OutputDataWrapper";
import { useEffect } from "react";

export function LexicalPlayground() {

	const { storedData, setStoredData } = useLocalStorage({
		key: "LexicalContent",
		defaultValue: "<h1>Добро пожаловать</h1>. <p>Давай создадим статью</p>",
	});

	const editor = JSON.parse(localStorage.getItem('editor')!)

	useEffect(() => {
		console.log(editor)
	}, [editor])
	
	return (
		<InputEditorWrapper>
			<PlaygroundApp />
			{editor && <OutputDataWrapper>
				{JSON.stringify(editor) || 'asdasd'}
			</OutputDataWrapper>}
		</InputEditorWrapper>
	);
}
