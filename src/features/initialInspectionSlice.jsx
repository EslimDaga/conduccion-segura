import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getInitialInspectionByIdService, getInitialInspectionsService } from "../services/initialInspectionsService";

export const resetErrors = createAction("initialInspections/reset-errors");

export const getInitialInspections = createAsyncThunk(
  "initialInspections/get-initial-inspections",
  async () => {
    const response = await getInitialInspectionsService();
    return response;
  }
);

export const getInitialInspectionById = createAsyncThunk(
  "initialInspections/get-initial-inspection",
  async (id) => {
    const response = await getInitialInspectionByIdService(id);
    return response;
  }
);


const initialInspectionSlice = createSlice({
  name: "initialInspections",
  initialState: {
    initialInspections: [],
    initialInspection: null,
    loading_initialInspections: false,
    loading_initialInspection: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialInspections.pending, (state) => {
        state.loading_initialInspections = true;
      })
      .addCase(getInitialInspections.fulfilled, (state, action) => {
        state.loading_initialInspections = false;
        state.initialInspections = action.payload.data;
      })
      .addCase(getInitialInspections.rejected, (state, action) => {
        state.loading_initialInspections = false;
        state.errors = action.error;
      })
      .addCase(getInitialInspectionById.pending, (state) => {
        state.loading_initialInspection = true;
      })
      .addCase(getInitialInspectionById.fulfilled, (state, action) => {
        state.loading_initialInspection = false;
        state.initialInspection = action.payload.data;
      })
      .addCase(getInitialInspectionById.rejected, (state, action) => {
        state.loading_initialInspection = false;
        state.errors = action.error;
      });
  },
});

export default initialInspectionSlice.reducer;