import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { searchIncidentsService } from "../services/searchInspectionsService";

export const resetErrors = createAction("searchInspections/reset-errors");

export const searchInspections = createAsyncThunk(
  "searchInspections/search-inspections",
  async (data, { rejectWithValue }) => {
    try {
      const response = await searchIncidentsService(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const searchInspectionSlice = createSlice({
  name: "searchInspections",
  initialState: {
    inspections: [],
    loading_inspections: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchInspections.pending, (state) => {
        state.loading_inspections = true;
      })
      .addCase(searchInspections.fulfilled, (state, action) => {
        state.loading_inspections = false;
        state.inspections = action.payload.data;
      })
      .addCase(searchInspections.rejected, (state, action) => {
        state.loading_inspections = false;
        state.error = action.error;
      })
      .addCase(resetErrors, (state) => {
        state.error = null;
      });
  },
});

export default searchInspectionSlice.reducer;
