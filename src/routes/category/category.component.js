import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useContext} from "react";

import './category.styles.scss';
import {CategoriesContext} from "../../contexts/categories.context";
import {ProductCard} from "../../components";

const Category = () => {

    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProduct] = useState(categoriesMap[category]);

    useEffect(() => {
        setProduct(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <div className={'category-container'}>
            <h2 className='title'>{category}</h2>
            {
              products && products.map(product => <ProductCard key={product.id} product={product}/>)
            }
        </div>
    );
};

export {Category};