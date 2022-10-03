import React from 'react';
import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils";

const SignIn= () => {

    const logGoogleUser = async () => {
     const {user}  = await signInWithGooglePopup();
     const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sing in with Google Popup
            </button>

        </div>
    );
};

export {SignIn};