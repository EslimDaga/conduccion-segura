import jwtInterceptor from "./jwtInterceptor";

export const getInitialInspectionsService = async () => {
  const response = await jwtInterceptor.get("/inspections/get-last-initial-inspections/");
  return response;
};

export const getInitialInspectionByIdService = async (id) => {
  const response = await jwtInterceptor.get(`/inspections/get-initial-inspection/${id}/`);
  return response;
};