import jwtInterceptor from "./jwtInterceptor";

export const searchInspectionsService = (data) => {
  const response = jwtInterceptor.post(
    "/reports/search-initial-inspections/",
    data
  );
  return response;
};

export const searchIncidentsService = (data) => {
  const response = jwtInterceptor.post("/reports/search-incidents/", data);
  return response;
};
