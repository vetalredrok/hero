import {createContext, useState} from "react";

import PRODUCNTS from '../shop-data.json'

export const ProductsContext = createContext({
    products: [],

});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCNTS);
    const value = {products}
    return(
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};