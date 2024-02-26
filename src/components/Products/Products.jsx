import React, { useEffect } from "react";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataThunkAction } from "../../redux-toolkit/productsSlice";
import { filteredProductsSelector } from "../../redux-toolkit/selector";

function Products() {
    const filteredProductList = useSelector(filteredProductsSelector);
    const dispatch = useDispatch();
    // console.log(productList);

    useEffect(() => {
        dispatch(fetchDataThunkAction());
    }, []);

    // console.log(filteredProductList);
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Products</h5>

            <div className="row">
                {filteredProductList.map((product) => (
                    <Product product={product} key={product.id} />
                ))}
            </div>
        </div>
    );
}

export default Products;
