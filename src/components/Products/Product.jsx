import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import GenerateStar from "./Star/GenerateStar";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../../redux-toolkit/cartSlice";
import { cartSeletor } from "../../redux-toolkit/selector";
import { toast } from "react-toastify";
import { priceAfterDiscount } from "../../helper/helper";
function Product({ product }) {
    product = {
        ...product,
        newPrice: priceAfterDiscount(product.price, product.discountPercentage),
    };
    const dispatch = useDispatch();
    const { cartDetail } = useSelector(cartSeletor);
    const handleDispatch = () => {
        dispatch(cartSlice.actions.addToCart(product));
        toast.success("Successfully added to cart");
    };
    return (
        <div className="col-md-3 mb-4">
            <div className="card d-flex align-items-center pt-4">
                <img
                    src={product.images[0]}
                    className="card-image-top"
                    alt=""
                    style={{ width: "90%" }}
                />
                <div className="w-100 px-4 py-3">
                    <p className="fw-bolder text-center">
                        {product.brand} - {product.title}
                    </p>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="me-1">
                            <GenerateStar star={product.rating} />
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="fs-10 badge bg-success">
                            {product.stock} In stock
                        </div>
                        <div className="fs-10 badge bg-danger">
                            {product.discountPercentage > 0 ? "On sale" : ""}
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <del className="line-through me-2">
                                ${product.price}
                            </del>
                            <span className="fs-4 text-danger fw-bolder">
                                ${product.newPrice}
                            </span>
                        </div>
                        <FaCartArrowDown
                            size={20}
                            className="btn-cart"
                            onClick={() => handleDispatch()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
