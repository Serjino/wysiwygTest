import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { FlexWrapper } from "../../../shared/ui/flexWrapper/FlexWrapper";
import { defaultTheme } from "../../../app/styles/theme/theme";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { OutputDataWrapper } from "../../ui/OutputDataWrapper";
import "./styles.scss";
import { InputEditorWrapper } from "../../ui/InputEditorWrapper";

const config = {
	placeholderText: "Edit Your Content Here!",
	charCounterCount: false,
	toolbarSticky: true,
};

export function FroalaJS() {

	const { storedData, setStoredData } = useLocalStorage({
		key: "FroalaJSContent",
		defaultValue: "<h1>Добро пожаловать</h1>. <p>Давай создадим статью</p>",
	});

	return (
		<InputEditorWrapper>
			<FroalaEditorComponent
				tag="textarea"
				config={config}
				model={storedData}
				onModelChange={setStoredData}
			/>
			<OutputDataWrapper>
				{storedData}
			</OutputDataWrapper>
		</InputEditorWrapper>
	);
}
