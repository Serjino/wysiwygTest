import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { memo, useState } from "react";
import { Editor } from "tinymce";

export const MyTinyMCE = 
	({
		handleContentChange,
	}: {
		handleContentChange: (content: string) => void;
	}) => {
		const [editorAPI, setEditorAPI] = useState<null | Editor>(null);
		const bufferContent = localStorage.getItem("TinyMCEContent");
		const initialContent =
			"<h1>Добро пожаловать</h1>. <p>Давай создадим статью</p>";
		return (
			<TinyMCEEditor
				apiKey="8fc1o9kwvzn22eu0x5o6bvdrrwsta4mlrkhqwrfcsm4sgdha"
				init={{
					plugins:
						"preview anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
					toolbar:
						"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
					tinycomments_mode: "embedded",
					tinycomments_author: "Author name",
					mergetags_list: [
						{ value: "First.Name", title: "First Name" },
						{ value: "Email", title: "Email" },
					],
					ai_request: (
						request: any,
						respondWith: { string: (arg0: () => Promise<never>) => any }
					) =>
						respondWith.string(() =>
							Promise.reject("See docs to implement AI Assistant")
						),
				}}
				onInit={(evt, editor) => setEditorAPI(editor)}
				onEditorChange={(e) => {
					// localStorage.setItem("content", e);
                    handleContentChange(e)
				}}
				initialValue={bufferContent || initialContent}
			/>
		);
	}
	// () => true
// );
