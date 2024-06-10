import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/header/ui/Header";
import { Fragment } from "react/jsx-runtime";
import { FlexWrapper } from "../../shared/ui/flexWrapper/FlexWrapper";

export function Layout() {
	return (
		<Fragment>
			<Header />
			<Outlet />
		</Fragment>
	);
}
