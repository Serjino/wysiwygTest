import { RouterProvider } from "react-router-dom";
import { router } from "./routing/router";
import { ThemeProvider } from "@emotion/react";
import { defaultTheme } from "./styles/theme/theme";
import { SnackbarProvider } from "notistack";
// import { initializeServer } from "./api/server/server";
import "./styles/index.scss";

// initializeServer();

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<SnackbarProvider
				maxSnack={5}
				autoHideDuration={2500}
				style={{
					maxWidth: 300,
				}}
			>
				<RouterProvider router={router} />
			</SnackbarProvider>
		</ThemeProvider>
	);
}
