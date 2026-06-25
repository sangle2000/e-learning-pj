import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpClient } from "../../utils/http"

const initialState = {
    username: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.username = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.username = action.payload
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.username = null
            })
    }
})

const getCurrentUser = createAsyncThunk(
    "auth/getMe",
    async(_, { rejectWithValue }) => {
        try {
            const response = await httpClient.get("/api/v1/auth/me")
            return response.data.username
        } catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi xác thực")
        }
    }
)

export const { logout } = authSlice
export default authSlice.reducer
