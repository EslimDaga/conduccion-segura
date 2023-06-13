import axios from "axios";

const jwtInterceptor = axios.create({
	baseURL: "http://sfdev.segursat.com/web/api",
	headers: {
		Authorization: "JWT ",
	},
});

jwtInterceptor.interceptors.request.use(
	config => {
		let token = JSON.parse(localStorage.getItem("user"));
		config.headers.Authorization = `JWT ${token.access}`;
		return config;
	},
	error => {
		Promise.reject(error);
	}
);

jwtInterceptor.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		if (error.response.status === 401) {
			localStorage.removeItem("user");
			window.location = "/login";
		}

		if (error.response.status === 403) {
			const authData = JSON.parse(localStorage.getItem("user"));
			const payload = {
				access: authData.access,
				refresh: authData.refresh,
			};

			let apiResponse = await jwtInterceptor.post("/token/refresh/", payload);

			localStorage.setItem(
				"user",
				JSON.stringify(Object.assign(authData, apiResponse.data))
			);
			error.config.headers["Authorization"] = `JWT ${apiResponse.data.access}`;
			return axios(error.config);
		} else {
			return Promise.reject(error);
		}
	}
);

export default jwtInterceptor;
