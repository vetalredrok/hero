import React, {useState} from 'react';

import {signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils";
import {FormInput} from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import {Button} from "../buttons/button.component";


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {email, password} = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    return alert('incorrect password for email');
                case 'auth/user-not-found':
                    return alert('no user associated with this email');
                default:
                    console.log(error);
            }
        }

    };


    const handleChange = (event) => {

        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})

    };


    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" required name='email' onChange={handleChange} value={email}/>

                <FormInput label='Password' type="password" required name='password' onChange={handleChange}
                           value={password}/>

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type={'button'} buttonType={'google'} onClick={signInWithGoogle}>Google sign in</Button>
                </div>

            </form>

        </div>
    );
};

export {SignInForm};