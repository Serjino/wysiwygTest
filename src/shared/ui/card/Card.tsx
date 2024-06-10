import { FlexWrapper } from "../flexWrapper/FlexWrapper";
import { Typography } from "../typography/Typography";
import { ICardProps } from "./model/Card.def";

export function Card({ src, title, subTitle, children, onClick }: ICardProps) {
	return (
		<FlexWrapper
			onClick={onClick}
			column
			style={{
				minHeight: 450,
				maxHeight: 450,
				alignItems: "flex-start",
				flex: "1 1 500px",
			}}
		>
			<FlexWrapper style={{ flex: "1 1 60%", overflow: "hidden" }}>
				<img
					src={src}
					alt={"img"}
					style={{ objectFit: "cover", width: "100%" }}
				></img>
			</FlexWrapper>
			<FlexWrapper column style={{ alignItems: "flex-start", flex: "0 0 40%" }}>
				<Typography variant="h3">{title}</Typography>
				<Typography>{subTitle}</Typography>
				{children}
			</FlexWrapper>
		</FlexWrapper>
	);
}
