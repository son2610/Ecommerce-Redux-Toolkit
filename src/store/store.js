import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "../redux-toolkit/productsSlice";
import filtersSlice from "../redux-toolkit/filtersSlice";
import cartSlice from "../redux-toolkit/cartSlice";

const store = configureStore({
    reducer: {
        products: ProductsSlice.reducer,
        filters: filtersSlice.reducer,
        cart: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            // Add other middleware if any
        }),
});

export default store;
