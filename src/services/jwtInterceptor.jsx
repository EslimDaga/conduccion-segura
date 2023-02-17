import axios from "axios";

const jwtInterceptor = axios.create({
	baseURL: "http://cptdev.segursat.com:8080/web/api/",
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
			console.log("401");
		}

		if (error.response.status === 403) {
			console.log("403");
		} else {
			return Promise.reject(error);
		}
	}
);

export default jwtInterceptor;
