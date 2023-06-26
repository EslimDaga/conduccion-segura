import jwtInterceptor from "./jwtInterceptor";

export const getRoutesService = async () => {
  const response = await jwtInterceptor.get("/routes/get-routes/");
  return response;
};

export const getRouteByIdService = async (id) => {
  const response = await jwtInterceptor.get(`/routes/get-route/${id}/`);
  return response;
};