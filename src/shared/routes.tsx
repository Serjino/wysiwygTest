import { RouteObject } from "react-router";
import { Layout } from "../pages/layout/Layout";
import { EditorJS } from "../pages/EditorJS/ui/EditorJS";
import { FroalaJS } from "../pages/FroalaJS/ui/FroalaJS";
import { Lexical } from "../pages/Lexical/ui/Lexical";
import { Slate } from "../pages/Slate/ui/Slate";
import TyniMCE from "../pages/TyniMCECloud/ui/TyniMCE";
import { CKEditor } from "../pages/CKEditor/ui/CKEditor";
import { FlexWrapper } from "./ui/flexWrapper/FlexWrapper";
import { TinyMCESelfHosted } from "../pages/TinyMCESelfHosted/ui/TinyMCESelfHosted";
import { LexicalPlayground } from "../pages/LexicalPlayground/ui/LexicalPlayGround";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				id: "TyniMCE",
				path: "TyniMCE",
				element: <TinyMCESelfHosted />,
				index: true,
			},
			{
				id: "FroalaJS",
				path: "FroalaJS",
				element: <FroalaJS />,
			},
			{
				id: "Lexical",
				path: "Lexical",
				element: <LexicalPlayground />,
			},
			// {
			// 	id: "EditorJS",
			// 	path: "EditorJS",
			// 	element: <EditorJS />,
			// 	index: true,
			// },
			// {
			// 	id: "Slate",
			// 	path: "Slate",
			// 	element: <Slate />,
			// },
			// {
			// 	id: "CKEditor",
			// 	path: "CKEditor",
			// 	element: <CKEditor />,
			// },
		],
	},
	{
		path: "*",
		element: <FlexWrapper section>404 - Not Found</FlexWrapper>,
	},
];
