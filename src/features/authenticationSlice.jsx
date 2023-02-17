import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { loginService } from "../services/authenticationService";

export const login = createAsyncThunk(
	"authentication/login",
	async (credentials, thunkAPI) => {
		try {
			const response = await loginService(credentials);
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const authenticationSlice = createSlice({
	name: "authentication",
	initialState: {
		access: null,
		refresh: null,
		status: "idle",
		error: null,
		isSubmitting: false,
	},
	reducers: {
		logout: state => {
			state.token = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(login.pending, state => {
			state.error = null;
			state.status = "loading";
			state.isSubmitting = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			console.log(action);
			state.status = "succeeded";
			state.isSubmitting = false;
			state.access = action.payload.access;
			state.refresh = action.payload.refresh;
			localStorage.setItem("user", JSON.stringify(action.payload));
		});
		builder.addCase(login.rejected, (state, action) => {
			state.status = "failed";
			state.isSubmitting = false;
			state.error = action.payload.detail;
		});
	},
});

export const { logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
