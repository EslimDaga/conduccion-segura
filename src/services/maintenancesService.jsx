import jwtInterceptor from "./jwtInterceptor";

export const getMaintenancesService = async () => {
  const response = await jwtInterceptor.get("/maintenances/get-last-maintenances/");
  return response;
};

export const getMaintenanceByIdService = async (id) => {
  const response = await jwtInterceptor.get(`/maintenances/get-maintenance/${id}/`);
  return response;
};