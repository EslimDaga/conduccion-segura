import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getMaintenanceByIdService, getMaintenancesService } from "../services/maintenancesService";

export const resetErrors = createAction("maintenances/reset-errors");

export const getMaintenances = createAsyncThunk(
  "maintenances/get-maintenances",
  async () => {
    const response = await getMaintenancesService();
    return response;
  }
);

export const getMaintenanceById = createAsyncThunk(
  "maintenances/get-maintenance",
  async (id) => {
    const response = await getMaintenanceByIdService(id);
    return response;
  }
);


const maintenanceSlice = createSlice({
  name: "maintenances",
  initialState: {
    maintenances: [],
    maintenance: null,
    loading_maintenances: false,
    loading_maintenance: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMaintenances.pending, (state) => {
        state.loading_maintenances = true;
      })
      .addCase(getMaintenances.fulfilled, (state, action) => {
        state.loading_maintenances = false;
        state.maintenances = action.payload.data;
      })
      .addCase(getMaintenances.rejected, (state, action) => {
        state.loading_maintenances = false;
        state.errors = action.error;
      })
      .addCase(getMaintenanceById.pending, (state) => {
        state.loading_maintenance = true;
      })
      .addCase(getMaintenanceById.fulfilled, (state, action) => {
        state.loading_maintenance = false;
        state.maintenance = action.payload.data;
      })
      .addCase(getMaintenanceById.rejected, (state, action) => {
        state.loading_maintenance = false;
        state.errors = action.error;
      });
  },
});

export default maintenanceSlice.reducer;