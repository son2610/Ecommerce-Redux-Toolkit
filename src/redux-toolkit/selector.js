import { createSelector } from "@reduxjs/toolkit";

export const filtersSelector = (state) => state.filters;
export const poductsSelector = (state) => state.products;
export const cartSeletor = (state) => state.cart;

// const mySelector = createSelector(
//     getSelector1,
//     getSelector2,
//     (selector1, selector2) => {
//       // ...
//     }
//   );
export const filteredProductsSelector = createSelector(
    filtersSelector,
    poductsSelector,
    (filters, products) => {
        const { searchText, brand, category } = filters;
        let filterdProduct = [...products.data];

        if (searchText) {
            filterdProduct = filterdProduct.filter((item) =>
                item.title.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        if (brand !== "All") {
            filterdProduct = filterdProduct.filter(
                (item) => item.brand === brand
            );
        }
        if (category !== "All") {
            filterdProduct = filterdProduct.filter(
                (item) => item.category === category
            );
        }
        return filterdProduct;
    }
);
