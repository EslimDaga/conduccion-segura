import jwtInterceptor from "./jwtInterceptor";

export const getUnitsService = async () => {
  const response = await jwtInterceptor.get("/units/get-units/");
  return response;
}

export const createUnitService = async (unit) => {
  const response = await jwtInterceptor.post("/units/create-unit/", unit);
  return response;
}