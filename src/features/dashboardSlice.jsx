import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getDashboardDataService } from "../services/dashboardService";

export const resetErrors = createAction("dashboard/reset-errors");

export const getDashboardData = createAsyncThunk(
  "dashboard/get-dashboard-data",
  async () => {
    const response = await getDashboardDataService();
    return response;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    total_units: 0,
    total_drivers: 0,
    total_initial_inspections: 0,
    total_maintenances: 0,
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetErrors, (state, action) => {
        state.error = null;
      })
      .addCase(getDashboardData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.total_units = action.payload.data.total_units;
        state.total_drivers = action.payload.data.total_drivers;
        state.total_initial_inspections =
          action.payload.data.total_initial_inspections;
        state.total_maintenances = action.payload.data.total_maintenances;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default dashboardSlice.reducer;