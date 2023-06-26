import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getRouteByIdService, getRoutesService } from "../services/RoutesService";

export const resetErrors = createAction("routes/reset-errors");

export const getRoutes = createAsyncThunk(
  "routes/get-routes",
  async () => {
    const response = await getRoutesService();
    return response;
  }
);

export const getRouteById = createAsyncThunk(
  "routes/get-route",
  async (id) => {
    const response = await getRouteByIdService(id);
    return response;
  }
);


const routeSlice = createSlice({
  name: "routes",
  initialState: {
    routes: [],
    route: null,
    loading_routes: false,
    loading_route: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoutes.pending, (state) => {
        state.loading_routes = true;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.loading_routes = false;
        state.routes = action.payload.data;
      })
      .addCase(getRoutes.rejected, (state, action) => {
        state.loading_routes = false;
        state.errors = action.error;
      })
      .addCase(getRouteById.pending, (state) => {
        state.loading_route = true;
      })
      .addCase(getRouteById.fulfilled, (state, action) => {
        state.loading_route = false;
        state.route = action.payload.data;
      })
      .addCase(getRouteById.rejected, (state, action) => {
        state.loading_route = false;
        state.errors = action.error;
      });
  },
});

export default routeSlice.reducer;