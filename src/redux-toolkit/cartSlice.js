import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { priceAfterDiscount } from "../helper/helper";
import { v4 as uuidv4 } from "uuid";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartId: uuidv4(),
        cartInfo: {
            subtotal: 0,
            shipping: 0,
            total: 0,
            orderDate: new Date().valueOf(),
        },
        cartDetail: [],
        customerInfo: {
            fullName: "",
            address: "",
            email: "",
            mobileNumber: "",
        },
    },
    reducers: {
        addToCart: (state, action) => {
            // th1: san pham chua co trong gio hang
            // + them thuoc tinh quantity = 1;
            // + tinh amount = quantity  * price

            // th2: san pham da co trong gio hang
            // + tang so luong (quantity) + 1 don vi
            // + tinh amount
            // + tinh lai subtotal
            //+ tinh lai total
            let cartItem = state.cartDetail.find(
                (item) => item.id === action.payload.id
            );
            // Neu san pham da co trong gio hang thi ta tang quantity len 1 phan tu
            if (cartItem?.id) {
                cartItem.quantity = Number(cartItem.quantity) + 1;
                cartItem.amount = cartItem.newPrice * Number(cartItem.quantity);
            }
            // Neu san pham chua co trong gio hang thi ta them 2 truong: quantity va amount vao state
            else {
                state.cartDetail.push({
                    ...action.payload, // Thêm tất cả các trường từ sản phẩm mới vào
                    quantity: 1,
                    amount: priceAfterDiscount(
                        action.payload.price,
                        action.payload.discountPercentage
                    ),
                });
            }

            let newSubtotal = 0;
            for (const item of state.cartDetail) {
                newSubtotal += item.newPrice * Number(item.quantity);
            }

            // Làm tròn tổng sau khi tính toán giảm giá cho từng sản phẩm
            newSubtotal = Math.round(newSubtotal);

            // Cập nhật thông tin giỏ hàng
            let newTotal = newSubtotal + Number(state.cartInfo.shipping);
            state.cartInfo.subtotal = newSubtotal;
            state.cartInfo.total = newTotal;
        },
        increaseItem: (state, action) => {
            let cartItem = state.cartDetail.find(
                (item) => item.id === action.payload.id
            );
            // Neu san pham da co trong gio hang thi ta tang quantity len 1 phan tu
            if (cartItem?.id) {
                cartItem.quantity += 1;
                cartItem.amount = cartItem.newPrice * Number(cartItem.quantity);
            }

            let newSubtotal = 0;
            for (const item of state.cartDetail) {
                newSubtotal += item.newPrice * Number(item.quantity);
            }

            // Làm tròn tổng sau khi tính toán giảm giá cho từng sản phẩm
            newSubtotal = Math.round(newSubtotal);

            // Cập nhật thông tin giỏ hàng
            let newTotal = newSubtotal + Number(state.cartInfo.shipping);
            state.cartInfo.subtotal = newSubtotal;
            state.cartInfo.total = newTotal;
        },
        decreaseQuantity: (state, action) => {
            let cartItem = state.cartDetail.find(
                (item) => item.id === action.payload.id
            );
            // Neu san pham da co trong gio hang thi ta tang quantity len 1 phan tu
            if (cartItem?.id) {
                cartItem.quantity -= 1;
                cartItem.amount = cartItem.newPrice * Number(cartItem.quantity);
            }

            let newSubtotal = 0;
            for (const item of state.cartDetail) {
                newSubtotal += item.newPrice * Number(item.quantity);
            }

            // Làm tròn tổng sau khi tính toán giảm giá cho từng sản phẩm
            newSubtotal = Math.round(newSubtotal);

            // Cập nhật thông tin giỏ hàng
            let newTotal = newSubtotal + Number(state.cartInfo.shipping);
            state.cartInfo.subtotal = newSubtotal;
            state.cartInfo.total = newTotal;
        },
        deleteItemCart: (state, action) => {
            console.log(action.payload);
            state.cartDetail = state.cartDetail.filter(
                (item) => item.id !== action.payload
            );
            let newSubtotal = 0;
            for (const item of state.cartDetail) {
                newSubtotal += item.newPrice * Number(item.quantity);
            }

            // Làm tròn tổng sau khi tính toán giảm giá cho từng sản phẩm
            newSubtotal = Math.round(newSubtotal);

            // Cập nhật thông tin giỏ hàng
            let newTotal = newSubtotal + Number(state.cartInfo.shipping);
            state.cartInfo.subtotal = newSubtotal;
            state.cartInfo.total = newTotal;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(checkoutThunkAction.pending, (state, action) => {})
            .addCase(checkoutThunkAction.fulfilled, (state, action) => {
                state.cartId = uuidv4();
                state.cartInfo = {
                    subtotal: 0,
                    shipping: 0,
                    total: 0,
                    orderDate: new Date().valueOf(),
                };
                state.cartDetail = [];
                state.customerInfo = {
                    fullName: "",
                    address: "",
                    email: "",
                    mobileNumber: "",
                };
            })
            .addCase(checkoutThunkAction.rejected, (state, action) => {}),
});

export const checkoutThunkAction = createAsyncThunk(
    "cart/checkout",
    async (data) => {
        console.log(data);
    }
);
export default cartSlice;
