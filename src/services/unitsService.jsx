import jwtInterceptor from "./jwtInterceptor"

export const getUnitsService = async () => {
  const response = await jwtInterceptor.get("/units/get-units/")
  return response.data
}