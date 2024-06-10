import { memo, useRef, useState } from "react";
import { Editor } from "tinymce";
import BundledEditor from "./BundledEditor";

export const MemoSelfHostedTinyMCE = memo(
	({
		handleContentChange,
	}: {
		handleContentChange: (content: string) => void;
	}) => {
		const [editorAPI, setEditorAPI] = useState<null | Editor>(null);
		const bufferContent = localStorage.getItem("TinyMCEContent");
		const initialContent =
			"<h1>Добро пожаловать</h1>. <p>Давай создадим статью</p>";

		const editorRef = useRef(null);

		return (
			<BundledEditor
				onInit={(evt, editor) => {
					console.log(editor.getWin().innerWidth);
					editorRef.current = editor;
					setEditorAPI(editor);
				}}
				onObjectResizeStart={(e) => console.log(e)}
				onEditorChange={(e) => {
					handleContentChange(e);
				}}
				init={{
					height: "100%",
					width: "100%",
					menubar: true,
					// outputFormat: 'text',
					plugins: [
						"advlist",
						"anchor",
						"autolink",
						"help",
						"image",
						"link",
						"lists",
						"searchreplace",
						"table",
						"wordcount",
						"markdown",
						"fullscreen"
					],
					toolbar:
						"undo redo | blocks | " +
						"bold italic forecolor | alignleft aligncenter " +
						"alignright alignjustify | bullist numlist outdent indent | " +
						"removeformat | help" +
						"image" + "markdown" + "fullscreen",
					content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
				}}
				licenseKey="gpl"
				initialValue={bufferContent || initialContent}
			/>
		);
	},
	() => true
);
