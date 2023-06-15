import jwtInterceptor from "./jwtInterceptor"

export const searchInspectionsService = (data) => {
  const response = jwtInterceptor.post("/reports/search-initial-inspections/", data);
  return response;
}