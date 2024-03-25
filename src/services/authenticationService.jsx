import axios from "axios";

export const loginService = async (credentials) => {
  const response = await axios.post(
    "http://safedriving.segursat.com/web/api/token/obtain/",
    {
      username: credentials.username,
      password: credentials.password,
    }
  );
  return response.data;
};
