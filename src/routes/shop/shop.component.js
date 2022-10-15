import React from 'react';
import {useContext} from "react";

import {ProductsContext} from "../../contexts/products.context";
import {ProductCard} from "../../components";

import './shop.styles.scss'


const ShopComponent = () => {
    const {products} = useContext(ProductsContext)
    return (
        <div className='products-container'>
            {
                products.map((product) => (
                    <ProductCard ket={product.id} product={product}/>
                ))
            }
        </div>
    );
};

export {ShopComponent};