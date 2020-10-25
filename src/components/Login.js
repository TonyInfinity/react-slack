import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {

    const [state, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png" alt="" />
                <h1>Sign in</h1>
            <Button onClick={signIn}>Sign in with Google</Button>
            </div>
            
        </div>
    );
}

export default Login;
