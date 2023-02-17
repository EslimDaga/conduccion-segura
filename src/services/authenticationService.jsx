import axios from "axios";

export const loginService = async credentials => {
	const response = await axios.post(
		"http://cptdev.segursat.com:8080/web/api/token/obtain/",
		{
			username: credentials.username,
			password: credentials.password,
		}
	);
	return response.data;
};
