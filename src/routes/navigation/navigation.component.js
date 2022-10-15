import {Link, Outlet} from "react-router-dom";
import React, {Fragment, useContext} from "react";

import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import './navigation.styles.scss'
import {UserContext} from "../../contexts/user.context";
import {CartContext} from "../../contexts/cart.context";
import {signOutUser} from "../../utils";
import {CartDropdown, CartIcon} from "../../components";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    const { isCartOpen} = useContext(CartContext);
    // console.log(currentUser);


    return(
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                    SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                        ) : (
                                <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>)
                    }
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </Fragment>
    )
}

export {Navigation};