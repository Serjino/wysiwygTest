import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const axiosInstance = axios.create({
	// baseURL: "http://localhost:3000",
	// headers: {
	// 	common: {
	// 		Authorization: "Bearer " + localStorage.getItem("token"),
	// 	},
	// },
});

axiosInstance.interceptors.response.use(undefined, error => {
	if (error?.response?.status == 401) {
		// logout();
	} else {
		enqueueSnackbar(error?.response?.statusText || "Ошибка", { variant: "error" });
		return Promise.reject(error);
	}
});
