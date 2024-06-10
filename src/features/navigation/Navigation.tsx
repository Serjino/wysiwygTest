import { defaultTheme } from "../../app/styles/theme/theme";
import { routes } from "../../shared/routes";
import { FlexWrapper } from "../../shared/ui/flexWrapper/FlexWrapper";
import { getFlattenedRoutes } from "./model/getFlattenedRoutes";
import { StyledNavLink } from "./ui/NavLink";
import { NavListItem } from "./ui/NavListItem";

export function Navigation() {
	const routesWithNavigation = getFlattenedRoutes(routes).filter(
		(route) => !!route.id
	);

	return (
		<FlexWrapper as={"nav"}>
			<FlexWrapper as={"ul"} gap={3}>
				{routesWithNavigation.map((route) => (
					<NavListItem key={route.path + route.id + ""}>
						<StyledNavLink
							to={route.path}
							style={({ isActive, isPending, isTransitioning }) => {
								return {
									color: isActive
										? defaultTheme.colors.primary
										: defaultTheme.colors.text.main,
								};
							}}
						>
							{route.id}
						</StyledNavLink>
					</NavListItem>
				))}
			</FlexWrapper>
		</FlexWrapper>
	);
}
