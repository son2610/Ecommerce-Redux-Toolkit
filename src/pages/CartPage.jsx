import React from "react";
import MainLayout from "../layouts/MainLayout";
import { priceAfterDiscount } from "../helper/helper";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartSeletor } from "../redux-toolkit/selector";
import cartSlice, { checkoutThunkAction } from "../redux-toolkit/cartSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function CartPage() {
    const dispatch = useDispatch();
    const { cartDetail, cartInfo, customerInfo, cartId } =
        useSelector(cartSeletor);

    const increaseQuantity = (item) => {
        if (item.quantity < item.stock) {
            dispatch(cartSlice.actions.increaseItem(item));
        }
    };

    const descreateQuantity = (item) => {
        if (item.quantity >= 2) {
            dispatch(cartSlice.actions.decreaseQuantity(item));
        } else {
            toast.error("You can't decrease quantity!!!!");
        }
    };
    const handleRemoveItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cartSlice.actions.deleteItemCart(id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            }
        });
    };

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",

        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    // tạo schema để validate
    const schema = yup
        .object({
            fullName: yup.string().required(),
            address: yup.string().required(),
            email: yup.string().required().email(),
            mobile: yup.string().required(),
        })
        .required();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });
    const handleSubmitForm = (values) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will receive your pickup soon!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // dispatch(cartSlice.actions.deleteItemCart(id));
                const data = {
                    cartId: cartId,
                    cartInfo: {
                        ...cartInfo,
                    },
                    cartDetail: [...cartDetail],
                    customerInfo: {
                        ...values,
                    },
                };
                dispatch(checkoutThunkAction(data));
                toast.success("thanh cong !!!");
            }
        });
        reset();
    };
    return (
        <MainLayout>
            <div className="container mt-1">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className=" py-2">Cart Detail</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <table className="table cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="text-end">Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-end">Total</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartDetail.map((item) => {
                                    return (
                                        <tr>
                                            <td style={{ maxWidth: "200px" }}>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        className="product-image"
                                                        src={item.images[0]}
                                                        alt=""
                                                    />
                                                    <div className="d-inline">
                                                        <div className="d-block fw-bolder mb-2">
                                                            {item.title.toLocaleUpperCase()}
                                                        </div>
                                                        <div className="d-block">
                                                            {item.brand.toLocaleUpperCase()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                $
                                                {priceAfterDiscount(
                                                    item.price,
                                                    item.discountPercentage
                                                )}
                                            </td>
                                            <td>
                                                <div className="cart-quantity-wrap">
                                                    <div className="cart-quantity">
                                                        <span
                                                            onClick={() =>
                                                                descreateQuantity(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </span>
                                                        <span>
                                                            {item.quantity}
                                                        </span>
                                                        <span
                                                            onClick={() =>
                                                                increaseQuantity(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                ${item.amount}
                                            </td>
                                            <td>
                                                <div className="action-wrap">
                                                    <span
                                                        onClick={() =>
                                                            handleRemoveItem(
                                                                item.id
                                                            )
                                                        }
                                                        className="btn-remove"
                                                    >
                                                        &times;
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {/* <tr>
                                    <td style={{ maxWidth: '200px' }}>
                                        <div className="d-flex align-items-center">
                                            <img className="product-image" src="https://cdn.dummyjson.com/product-images/2/3.jpg" alt="" />
                                            <div className="d-inline">
                                                <div className="d-block fw-bolder mb-2">{"iPhone X".toLocaleUpperCase()}</div>
                                                <div className="d-block">{"Apple".toLocaleUpperCase()}</div>
                                            </div>
                                        </div>

                                    </td>
                                    <td className="text-end">
                                        ${priceAfterDiscount(200, 12.96)}
                                    </td>
                                    <td >
                                        <div className="cart-quantity-wrap">
                                            <div className="cart-quantity">
                                                <span>-</span>
                                                <span>1</span>
                                                <span>+</span>
                                            </div>
                                        </div>

                                    </td>
                                    <td className="text-end">
                                        ${priceAfterDiscount(200, 12.96)}
                                    </td>
                                    <td>
                                        <div className="action-wrap">
                                            <span className="btn-remove">&times;</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ maxWidth: '200px' }}>
                                        <div className="d-flex align-items-center">
                                            <img className="product-image" src="https://cdn.dummyjson.com/product-images/3/1.jpg" alt="" />
                                            <div className="d-inline">
                                                <div className="d-block fw-bolder mb-2">{"Samsung Universe 9".toLocaleUpperCase()}</div>
                                                <div className="d-block">{"Samsung".toLocaleUpperCase()}</div>
                                            </div>
                                        </div>

                                    </td>
                                    <td className="text-end">
                                        ${priceAfterDiscount(200, 12.96)}
                                    </td>
                                    <td >
                                        <div className="cart-quantity-wrap">
                                            <div className="cart-quantity">
                                                <span>-</span>
                                                <span>1</span>
                                                <span>+</span>
                                            </div>
                                        </div>

                                    </td>
                                    <td className="text-end">
                                        ${priceAfterDiscount(200, 12.96)}
                                    </td>
                                    <td>
                                        <div className="action-wrap">
                                            <span className="btn-remove">&times;</span>
                                        </div>
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                        <div className="row col-md-12">
                            <Link to={"/product"}>
                                <FaArrowLeft /> Countinue shopping
                            </Link>
                        </div>
                    </div>
                    <div
                        className="col-sm-12 col-md-12 col-lg-4"
                        style={{ minWidth: "300px" }}
                    >
                        <div className="order-summary p-3">
                            <h3 className="border-bottom py-2">
                                Order Summary
                            </h3>
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span>Subtotal</span>
                                    <span className="fw-bolder">
                                        {cartInfo.subtotal}
                                    </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span>Shipping</span>
                                    <span className="fw-bolder">Free</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top mt-2 py-2">
                                <span className="fs-6">Total</span>
                                <span className="fw-bolder fs-6">
                                    {formatter.format(cartInfo.total)}
                                </span>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <div className="customer-info p-3">
                                <h3 className="border-bottom py-2">
                                    Customer Info
                                </h3>
                                <div className="form-group mb-3">
                                    <label className="form-label">
                                        Fullname
                                    </label>
                                    <input
                                        name="fullName"
                                        {...register("fullName")}
                                        type="text"
                                        className={`form-control ${
                                            errors.fullName?.message
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Fullname"
                                    />
                                    <div class="invalid-feedback">
                                        {errors.fullName?.message}
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">
                                        Address
                                    </label>
                                    <input
                                        name="address"
                                        {...register("address")}
                                        type="text"
                                        className={`form-control ${
                                            errors.address?.message
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Address"
                                    />
                                    <div class="invalid-feedback">
                                        {errors.address?.message}
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        name="email"
                                        {...register("email")}
                                        type="text"
                                        className={`form-control ${
                                            errors.email?.message
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Email"
                                    />
                                    <div class="invalid-feedback">
                                        {errors.email?.message}
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Mobile</label>
                                    <input
                                        name="mobile"
                                        {...register("mobile")}
                                        type="text"
                                        className={`form-control ${
                                            errors.mobile?.message
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Mobile"
                                    />
                                    <div class="invalid-feedback">
                                        {errors.mobile?.message}
                                    </div>
                                </div>
                            </div>
                            <div className="py-3 bg-success mt-2 d-flex align-items-center justify-content-center text-white btn-checkout">
                                <button
                                    className="btn bg-success btn-block flex-grow-1"
                                    type="submit"
                                    // onClick={() => handleSubmitForm()}
                                >
                                    CHECKOUT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default CartPage;
