import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { createDriverService, deleteDriverService, getDriverByIdService, getDriversService, updateDriverService } from "../services/driversService";

export const resetErrors = createAction("drivers/reset-errors");

export const getDrivers = createAsyncThunk(
  "drivers/get-drivers",
  async () => {
    const response = await getDriversService();
    return response;
  }
);

export const getDriverById = createAsyncThunk(
  "drivers/get-driver-by-id",
  async (id) => {
    const response = await getDriverByIdService(id);
    return response;
  }
);

export const createDriver = createAsyncThunk(
  "drivers/create-driver",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createDriverService(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const updateDriver = createAsyncThunk(
  "drivers/update-driver",
  async (driver, { rejectWithValue }) => {
    try {
      const response = await updateDriverService(driver);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const deleteDriver = createAsyncThunk(
  "drivers/delete-driver",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteDriverService(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

const driverSlice = createSlice({
  name: "drivers",
  initialState: {
    drivers: [],
    driver: null,
    loading_drivers: false,
    loading_driver: false,
    is_saving: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetErrors, (state) => {
        state.error = null;
      })
      .addCase(getDrivers.pending, (state) => {
        state.loading_drivers = true;
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        state.loading_drivers = false;
        state.drivers = action.payload.data;
      })
      .addCase(getDrivers.rejected, (state, action) => {
        state.loading_drivers = false;
        state.error = action.error;
      })
      .addCase(getDriverById.pending, (state) => {
        state.loading_driver = true;
      })
      .addCase(getDriverById.fulfilled, (state, action) => {
        state.loading_driver = false;
        state.driver = action.payload.data;
      })
      .addCase(getDriverById.rejected, (state, action) => {
        state.loading_driver = false;
        state.error = action.error;
      })
      .addCase(createDriver.pending, (state) => {
        state.is_saving = true;
      })
      .addCase(createDriver.fulfilled, (state, action) => {
        state.is_saving = false;
        state.drivers = [...state.drivers, action.payload.data];
      })
      .addCase(createDriver.rejected, (state, action) => {
        state.is_saving = false;
        state.error = action.payload;
      })
      .addCase(updateDriver.pending, (state) => {
        state.is_saving = true;
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        state.is_saving = false;
        state.drivers = state.drivers.map((driver) => {
          if (driver.id === action.payload.data.id) {
            return action.payload.data;
          }
          return driver;
        })
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.is_saving = false;
        state.error = action.payload;
      })
      .addCase(deleteDriver.pending, (state) => {
        state.loading_drivers = true;
      })
      .addCase(deleteDriver.fulfilled, (state, action) => {
        state.loading_drivers = false;
        state.drivers = state.drivers.filter((driver) => driver.id !== action.payload.data.id);
      })
      .addCase(deleteDriver.rejected, (state, action) => {
        state.loading_drivers = false;
        state.error = action.payload;
      });
  },
});

export default driverSlice.reducer;