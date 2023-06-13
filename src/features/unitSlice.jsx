import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { createUnitService, deleteUnitService, getUnitByIdService, getUnitsService, updateUnitService } from "../services/unitsService";

export const resetErrors = createAction("units/reset-errors");

export const getUnits = createAsyncThunk(
  "units/get-units",
  async () => {
    const response = await getUnitsService();
    return response;
  }
);

export const getUnitById = createAsyncThunk(
  "units/get-unit-by-id",
  async (id) => {
    const response = await getUnitByIdService(id);
    return response;
  }
);

export const createUnit = createAsyncThunk(
  "units/create-unit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createUnitService(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const updateUnit = createAsyncThunk(
  "units/update-unit",
  async (unit, { rejectWithValue }) => {
    try {
      const response = await updateUnitService(unit);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const deleteUnit = createAsyncThunk(
  "units/delete-unit",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteUnitService(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

const unitSlice = createSlice({
  name: "units",
  initialState: {
    units: [],
    unit: null,
    loading_units: false,
    loading_unit: false,
    is_saving: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetErrors, (state) => {
        state.error = null;
      })
      .addCase(getUnits.pending, (state) => {
        state.loading_units = true;
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.loading_units = false;
        state.units = action.payload.data;
      })
      .addCase(getUnits.rejected, (state, action) => {
        state.loading_units = false;
        state.error = action.error;
      })
      .addCase(getUnitById.pending, (state) => {
        state.loading_unit = true;
      })
      .addCase(getUnitById.fulfilled, (state, action) => {
        state.loading_unit = false;
        state.unit = action.payload.data;
      })
      .addCase(getUnitById.rejected, (state, action) => {
        state.loading_unit = false;
        state.error = action.error;
      })
      .addCase(createUnit.pending, (state) => {
        state.is_saving = true;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.is_saving = false;
        state.units = [...state.units, action.payload.data];
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.is_saving = false;
        state.error = action.payload;
      })
      .addCase(updateUnit.pending, (state) => {
        state.is_saving = true;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        state.is_saving = false;
        state.units = state.units.map((unit) => {
          if (unit.id === action.payload.data.id) {
            return action.payload.data;
          }
          return unit;
        })
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.is_saving = false;
        state.error = action.payload;
      })
      .addCase(deleteUnit.pending, (state) => {
        state.loading_units = true;
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.loading_units = false;
        state.units = state.units.filter((unit) => unit.id !== action.payload.data.id);
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        state.loading_units = false;
        state.error = action.payload;
      });
  },
});

export default unitSlice.reducer;