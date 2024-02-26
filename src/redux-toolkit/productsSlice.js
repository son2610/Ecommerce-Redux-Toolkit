import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        status: "idle",
        data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataThunkAction.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(fetchDataThunkAction.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload;
            })
            .addCase(fetchDataThunkAction.rejected, (state, action) => {
                state.status = "idle";
                // Handle errors if necessary
            });
    },
});

export const fetchDataThunkAction = createAsyncThunk(
    "fetchDataThunkAction",
    async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products?limit=100`);
            const data = await res.json();
            // console.log(data);
            return data?.products;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Nếu không xử lý ở đây, lỗi sẽ được truyền xuống reducer thông qua rejected action
        }
    }
);

export default ProductsSlice;
