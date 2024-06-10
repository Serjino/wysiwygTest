import { FlexWrapper } from "../../../shared/ui/flexWrapper/FlexWrapper";
import { Typography } from "../../../shared/ui/typography/Typography";
import { ReactComponent as Logo } from "../../../shared/assets/images/logo.svg";
import { Navigation } from "../../../features/navigation/Navigation";

export function Header() {
	return (
		<FlexWrapper section style={{ justifyContent: "space-between" }}>
			<FlexWrapper>
				{/* <Logo /> */}
				<Typography as="h1" variant={"h1"}>
					DoMeg
				</Typography>
			</FlexWrapper>
			<Navigation />
		</FlexWrapper>
	);
}
