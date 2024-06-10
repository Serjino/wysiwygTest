import { useCallback, useEffect, useState } from "react";
import { FlexWrapper } from "../../../shared/ui/flexWrapper/FlexWrapper";
import { MemoSelfHostedTinyMCE } from "./MemoSelfHostedTinyMCE";
import { defaultTheme } from "../../../app/styles/theme/theme";
import "./styles.scss";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { OutputDataWrapper } from "../../ui/OutputDataWrapper";
import { InputEditorWrapper } from "../../ui/InputEditorWrapper";

export function TinyMCESelfHosted() {
	const { storedData, setStoredData } = useLocalStorage({
		key: "TinyMCEContent",
		defaultValue: "<h1>Добро пожаловать</h1>. <p>Давай создадим статью</p>",
	});

	return (
		<InputEditorWrapper>
			<MemoSelfHostedTinyMCE handleContentChange={setStoredData} />
			<OutputDataWrapper>
				{storedData}
			</OutputDataWrapper>
		</InputEditorWrapper>
	);
}
