import { loginUserWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        
        const result = await signInWithGoogle();
        if(! result.ok) return dispatch( logout( result.errorMessage ) );
        
        dispatch( login(result) );
        
    }
}

export const startRegisterUserWithEmailPassword = ({ email, password, displayName }) => {

    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const result = await registerUserWithEmailPassword({email, password, displayName});
        if(! result.ok) return dispatch(logout( result.errorMessage ));
        
        dispatch( login(result) );
        
    }
}

export const startLoginUserWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        
        dispatch( checkingCredentials() );
        const result = await loginUserWithEmailPassword({email, password});
        
        if(! result.ok) return dispatch(logout( result.errorMessage ));
        dispatch( login(result) );

    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        
        dispatch(clearNotesLogout());
        
        dispatch(logout());
    }
}