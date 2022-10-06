import React from 'react';

import {SignUpForm, SignInForm} from "../../components";
import './authentication.component.styles.scss'

const Authentication= () => {

    return (
        <div className={'authentication-container'}>
            <SignInForm/>
            <SignUpForm/>

        </div>
    );
};

export {Authentication};