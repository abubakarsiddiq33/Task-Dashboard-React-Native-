import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 export const fetchApi = createAsyncThunk("user/fetchApi", 
    async() => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos")
        const data = await res.json()
        return data
    }
)

const initialState = {
    users : [],
    loading : false,
    error : null
}

const fetchSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder 
        .addCase(fetchApi.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchApi.fulfilled, (state,action) => {
            state.loading = false
             state.users = action.payload
            state.error = null
        })
        .addCase(fetchApi.rejected, (state) => {
            state.loading = false
            state.error = "Fetch Error"
        })
        

    }
})
export default fetchSlice.reducer