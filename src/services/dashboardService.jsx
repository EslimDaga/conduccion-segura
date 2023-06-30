import jwtInterceptor from "./jwtInterceptor";

export const getDashboardDataService = async () => {
  const response = jwtInterceptor.get("/reports/get-dashboard-data/");
  return response;
};