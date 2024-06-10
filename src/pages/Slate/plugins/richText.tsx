import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import {
	Editable,
	withReact,
	useSlate,
	Slate,
	ReactEditor,
	useSlateStatic,
	useSelected,
	useFocused,
} from "slate-react";
import {
	Editor,
	Transforms,
	createEditor,
	Descendant,
	Element as SlateElement,
	BaseEditor,
	BaseText,
	BaseElement,
} from "slate";
import isUrl from "is-url";
import { HistoryEditor, withHistory } from "slate-history";
import { Button, Icon, Toolbar } from "../components";
import { JSX } from "react/jsx-runtime";
import { CustomEditor, ImageElement } from "../types.def";
import { css } from "@emotion/css";
//@ts-ignore
import imageExtensions from "image-extensions";

const HOTKEYS = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const RichTextExample = () => {
	const renderElement = useCallback(
		(
			props: JSX.IntrinsicAttributes & {
				attributes: any;
				children: any;
				element: any;
			}
		) => <Element {...props} />,
		[]
	);
	const renderLeaf = useCallback(
		(
			props: JSX.IntrinsicAttributes & {
				attributes: any;
				children: any;
				leaf: any;
			}
		) => <Leaf {...props} />,
		[]
	);

	const withImages = (editor: BaseEditor & ReactEditor & HistoryEditor) => {
		const { insertData, isVoid } = editor;

		editor.isVoid = (element) => {
			return element.type === "image" ? true : isVoid(element);
		};

		editor.insertData = (data) => {
			const text = data.getData("text/plain");
			const { files } = data as any;

			if (files && files.length > 0) {
				for (const file of files) {
					const reader = new FileReader();
					const [mime] = file.type.split("/");

					if (mime === "image") {
						reader.addEventListener("load", () => {
							const url = reader.result;
							insertImage(editor, url as string);
						});

						reader.readAsDataURL(file);
					}
				}
			} else if (isImageUrl(text)) {
				insertImage(editor, text);
			} else {
				insertData(data);
			}
		};

		return editor;
	};

	const insertImage = (editor: BaseEditor, url: string) => {
		const text = { text: "" };
		const image: ImageElement = { type: "image", url, children: [text] };
		Transforms.insertNodes(editor as CustomEditor, image);
		Transforms.insertNodes(editor as CustomEditor, {
			type: "paragraph",
			children: [{ text: "" }],
		});
	};

	const Element = (
		props: JSX.IntrinsicAttributes & {
			attributes: any;
			children: any;
			element: any;
		}
	) => {
		const { attributes, children, element } = props;

		switch (element.type) {
			case "image":
				return <Image {...props} />;
			default:
				return <p {...attributes}>{children}</p>;
		}
	};

	const Image = ({
		attributes,
		children,
		element,
	}: {
		attributes: HTMLImageElement["attributes"];
		children: any;
		element: any;
	}) => {
		const editor = useSlateStatic();
		const path = ReactEditor.findPath(editor, element);

		const selected = useSelected();
		const focused = useFocused();
		return (
			<div {...attributes}>
				{children}
				<div
					contentEditable={false}
					className={css`
						position: relative;
					`}
				>
					<img
						src={element.url}
						className={css`
							display: block;
							max-width: 100%;
							max-height: 20em;
							box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
						`}
					/>
					<Button
						active
						onClick={() => Transforms.removeNodes(editor, { at: path })}
						className={css`
							display: ${selected && focused ? "inline" : "none"};
							position: absolute;
							top: 0.5em;
							left: 0.5em;
							background-color: white;
						`}
					>
						<Icon>delete</Icon>
					</Button>
				</div>
			</div>
		);
	};

	const isImageUrl = (url: string | URL) => {
		if (!url) return false;
		if (!isUrl(url as string)) return false;
		const ext = new URL(url).pathname.split(".").pop();
		return imageExtensions.includes(ext);
	};

	const editor = useMemo(
		() => withImages(withHistory(withReact(createEditor()))),
		[]
	);

	return (
		<Slate editor={editor} initialValue={initialValue as any}>
			<Toolbar>
				<MarkButton format="bold" icon="format_bold" />
				<MarkButton format="italic" icon="format_italic" />
				<MarkButton format="underline" icon="format_underlined" />
				<MarkButton format="code" icon="code" />
				<BlockButton format="heading-one" icon="looks_one" />
				<BlockButton format="heading-two" icon="looks_two" />
				<BlockButton format="block-quote" icon="format_quote" />
				<BlockButton format="numbered-list" icon="format_list_numbered" />
				<BlockButton format="bulleted-list" icon="format_list_bulleted" />
				<BlockButton format="left" icon="format_align_left" />
				<BlockButton format="center" icon="format_align_center" />
				<BlockButton format="right" icon="format_align_right" />
				<BlockButton format="justify" icon="format_align_justify" />
			</Toolbar>
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				placeholder="Enter some rich text…"
				spellCheck
				autoFocus
				onKeyDown={(event) => {
					for (const hotkey in HOTKEYS) {
						if (isHotkey(hotkey, event as any)) {
							event.preventDefault();
							const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
							toggleMark(editor, mark);
						}
					}
				}}
			/>
		</Slate>
	);
};

const toggleBlock = (editor: BaseEditor, format: string) => {
	const isActive = isBlockActive(
		editor,
		format,
		TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
	);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor as CustomEditor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			LIST_TYPES.includes((n as any).type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	});
	let newProperties: Partial<{ align: string; type: string }>;
	if (TEXT_ALIGN_TYPES.includes(format)) {
		newProperties = {
			align: isActive ? undefined : format,
		};
	} else {
		newProperties = {
			type: isActive ? "paragraph" : isList ? "list-item" : format,
		};
	}
	Transforms.setNodes<SlateElement>(
		editor as CustomEditor,
		newProperties as Partial<BaseElement>
	);

	if (!isActive && isList) {
		const block = { type: format, children: [] as any[] };
		Transforms.wrapNodes(editor as CustomEditor, block as unknown as any);
	}
};

const toggleMark = (editor: BaseEditor, format: string) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor as CustomEditor, format);
	} else {
		Editor.addMark(editor as CustomEditor, format, true);
	}
};

const isBlockActive = (
	editor: BaseEditor,
	format: string,
	blockType = "type"
) => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor as CustomEditor, {
			at: Editor.unhangRange(editor as CustomEditor, selection),
			match: (n) =>
				!Editor.isEditor(n) &&
				SlateElement.isElement(n) &&
				(n[blockType as keyof typeof n] as unknown as string) === format,
		})
	);

	return !!match;
};

const isMarkActive = (editor: BaseEditor, format: string | number) => {
	const marks = Editor.marks(editor as CustomEditor);
	return marks ? marks[format as keyof typeof marks] === true : false;
};

const Element = ({
	attributes,
	children,
	element,
}: {
	attributes: HTMLElement["attributes"];
	children: React.ReactNode;
	element: any;
}) => {
	const style = { textAlign: element.align };
	switch (element.type) {
		case "block-quote":
			return (
				<blockquote style={style} {...attributes}>
					{children}
				</blockquote>
			);
		case "bulleted-list":
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			);
		case "heading-one":
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			);
		case "heading-two":
			return (
				<h2 style={style} {...attributes}>
					{children}
				</h2>
			);
		case "list-item":
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			);
		case "numbered-list":
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			);
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
	}
};

const Leaf = ({
	attributes,
	children,
	leaf,
}: {
	attributes: HTMLSpanElement["attributes"];
	children: React.ReactNode;
	leaf: any;
}) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const BlockButton = ({
	format,
	icon,
}: {
	format: string | number;
	icon: any;
}) => {
	const editor = useSlate();
	return (
		<Button
			active={isBlockActive(
				editor,
				format as string,
				TEXT_ALIGN_TYPES.includes(format as string) ? "align" : "type"
			)}
			onMouseDown={(event: { preventDefault: () => void }) => {
				event.preventDefault();
				toggleBlock(editor, format as string);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

const MarkButton = ({
	format,
	icon,
}: {
	format: string | number;
	icon: any;
}) => {
	const editor = useSlate();
	return (
		<Button
			active={isMarkActive(editor, format)}
			onMouseDown={(event: { preventDefault: () => void }) => {
				event.preventDefault();
				toggleMark(editor, format as string);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

const initialValue: BaseElement[] = [
	{
		type: "paragraph",
		children: [
			{ text: "This is editable " },
			{ text: "rich", bold: true } as BaseText,
			{ text: " text, " },
			{ text: "much", italic: true } as BaseText,
			{ text: " better than a " },
			{ text: "<textarea>", code: true } as BaseText,
			{ text: "!" },
		],
	} as BaseElement,
	{
		type: "paragraph",
		children: [
			{
				text: "Since it's rich text, you can do things like turn a selection of text ",
			},
			{ text: "bold", bold: true } as BaseText,
			{
				text: ", or add a semantically rendered block quote in the middle of the page, like this:",
			},
		],
	} as BaseElement,
	{
		type: "block-quote",
		children: [{ text: "A wise quote." }],
	} as BaseElement,
	{
		type: "paragraph",
		align: "center",
		children: [{ text: "Try it out for yourself!" }],
	} as BaseElement,
];

export default RichTextExample;
