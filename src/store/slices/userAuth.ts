import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    isError: false,
    isFulfilled: false
};

type authObj = { username: string, password: string };

const postUrl = 'http://localhost:8080/register';

const userAuthSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleUserRegistration.pending, (state) => {
                state.isLoading = true
            })
            .addCase(handleUserRegistration.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(handleUserRegistration.fulfilled, (state) => {
                state.isError = false;
                state.isLoading = false;
                state.isFulfilled = true;
            })
    }
});

export const userAuthReducer = userAuthSlice.reducer;

export const handleUserRegistration =
    createAsyncThunk('login/register', async (
        credentials: authObj, { rejectWithValue }
    ) => {
        try {
            await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })

        } catch (err) {
            console.error(err);
            return rejectWithValue('Failed to post data')
        }
    });
