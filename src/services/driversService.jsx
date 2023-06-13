import jwtInterceptor from "./jwtInterceptor"

export const getDriversService = async () => {
  const response = await jwtInterceptor.get("/drivers/get-drivers/");
  return response;
};

export const getDriverByIdService = async (id) => {
  const response = await jwtInterceptor.get(`/drivers/get-driver/${id}/`);
  return response;
};

export const createDriverService = async (driver) => {
  const response = await jwtInterceptor.post("/drivers/create-driver/", driver);
  return response;
};

export const updateDriverService = async (driver) => {
  const response = await jwtInterceptor.put(`/drivers/update-driver/${driver.id}/`, driver);
  return response;
};

export const deleteDriverService = async (id) => {
  const response = await jwtInterceptor.delete(`/drivers/delete-driver/${id}/`);
  return response;
};