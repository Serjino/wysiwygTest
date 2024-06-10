declare module "*.svg" {
	import React from "react";
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

declare module "*.webp" {
	const content: string;
	export default content;
}

declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";

declare module 'prettier';
declare module 'prettier/standalone';
declare module "prettier/parser-postcss";
declare module "prettier/parser-html";
declare module "prettier/parser-babel";
declare module "prettier/parser-markdown";
