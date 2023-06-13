import jwtInterceptor from "./jwtInterceptor"

export const getDriversService = async () => {
  const response = await jwtInterceptor.get("/drivers/get-drivers/")
  return response.data
}