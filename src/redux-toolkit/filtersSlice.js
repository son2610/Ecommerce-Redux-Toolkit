// B1: khoi tao ruder slice
// imp createSliece tu thu vien redux

import { createSlice } from "@reduxjs/toolkit";

// B2: khoi tao doi tuong tu ham createSliece => nhan vao 1 object gom 4 tham so
const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        searchText: "",
        category: "All",
        brand: "All",
        status: [],
        price: "0,0",
    },
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setSearchBrand: (state, action) => {
            state.brand = action.payload;
        },
        setSearchCategory: (state, action) => {
            state.category = action.payload;
        },
    },
});

// B3: khoi tao reducer

export default filtersSlice;
