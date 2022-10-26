import React from 'react';
import {Route, Routes} from "react-router-dom";

import {Home, Navigation, Authentication, ShopComponent, Checkout} from "./routes";




const App = () => {

    return (

        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path='shop' element={<ShopComponent/>}/>
                <Route path='auth' element={<Authentication/>}/>
                <Route path='checkout' element={<Checkout/>}/>
            </Route>
        </Routes>
    );
};

export default App;