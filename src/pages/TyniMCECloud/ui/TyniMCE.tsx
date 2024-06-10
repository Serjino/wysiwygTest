import { useCallback, useEffect, useRef, useState } from "react";
import { FlexWrapper } from "../../../shared/ui/flexWrapper/FlexWrapper";
import { MyTinyMCE } from "./MyTyniMCE";
import { useDidMountEffect } from "../../../shared/hooks/useDidMountEffect";

export default function TinyMCE() {
	const [content, setContent] = useState(localStorage.getItem("TinyMCEContent"));
	const handleContentChange = useCallback((content: string) => {
		setContent(content);
	}, []);
	
	useEffect(() => {
		return () => {
			localStorage.setItem('TinyMCEContent', content)
		}
	}, [])

	return (
		<FlexWrapper section style={{ alignItems: "flex-start", height: "100%" }}>
			<MyTinyMCE handleContentChange={handleContentChange} />
			<FlexWrapper
				style={{
					flex: "0 0 30%",
					alignItems: "flex-start",
					overflow: "auto",
					height: "calc(100% - 150px)",
				}}
			>
				{content}
			</FlexWrapper>
		</FlexWrapper>
	);
}
