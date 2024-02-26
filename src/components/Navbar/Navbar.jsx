import React from "react";
import { FaCartPlus, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { SiKasasmart } from "react-icons/si";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import filtersSlice from "../../redux-toolkit/filtersSlice";
import { cartSeletor } from "../../redux-toolkit/selector";

function Navbar() {
    const dispatch = useDispatch();
    const { cartDetail } = useSelector(cartSeletor);
    return (
        <div className="container py-4 border-bottom">
            <div className="row">
                <div className="col-sm-12 col-md-5 col-lg-3">
                    <Link to={"/"} className="logo">
                        <SiKasasmart size={30} className="me-2" />
                        <span className="fs-4">Shopping Mall</span>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-7 col-lg-9 d-flex align-items-center justify-content-between">
                    <form className="w-50 d-flex align-items-center">
                        <input
                            type="search"
                            placeholder="Enter product name"
                            className="form-control"
                            style={{ paddingRight: "25px" }}
                            onInput={(e) =>
                                dispatch(
                                    filtersSlice.actions.setSearchText(
                                        e.target.value
                                    )
                                )
                            }
                        />
                        <FaSearch
                            size={15}
                            style={{
                                marginLeft: "-25px",
                                color: "rgba(0,0,0,.2)",
                            }}
                        />
                    </form>
                    <div className="position-relative">
                        {cartDetail.length > 0 ? (
                            <Link to={"/cart"}>
                                <FaShoppingCart
                                    size={20}
                                    className="me-2"
                                    role="button"
                                />
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartDetail.length}
                                </span>
                            </Link>
                        ) : (
                            <FaShoppingCart
                                size={20}
                                className="me-2"
                                role="button"
                            />
                        )}
                        {/* <FaUser size={20} role="button" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
