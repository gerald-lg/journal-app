import { loginUserWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSignIn, startLoginUserWithEmailPassword, startLogout, startRegisterUserWithEmailPassword } from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixture";

jest.mock('../../../src/firebase/providers');

describe('Pruebas sobre thunks', () => {
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());
  
    test('debe de invocar el checkingCredentials', async() => {
        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - success', async () => {

        const loginData = { ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - error', async () => {

        const loginData = { ok: false, errorMessage: 'Un error en google' }
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });


    test('startLoginUserWithEmailPassword debe de llamar checkingCredentials y login - success', async () => {

        const loginData = { ok: true, ...demoUser };
        const loginCredentials = { email: demoUser.email, password: '123456'}; 

        await loginUserWithEmailPassword.mockResolvedValue( loginData );

        await startLoginUserWithEmailPassword(loginCredentials)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLoginUserWithEmailPassword debe de llamar checkingCredentials y logout - error', async () => {

        const loginData = { ok: false, errorMessage: 'Error de credenciales' };
        const loginCredentials = { email: demoUser.email, password: '123456'}; 

        await loginUserWithEmailPassword.mockResolvedValue( loginData );

        await startLoginUserWithEmailPassword(loginCredentials)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

    });

    test('startRegisterUserWithEmailPassword debe de llamar checkCredentials y login - success ', async () => {

        const loginData = { ok: true, ...demoUser};
        const registerData = { email: demoUser.email, displayName : demoUser.displayName, password: '123456'};

        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        await startRegisterUserWithEmailPassword( registerData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startRegisterUserWithEmailPassword debe de llamar checkCredentials y logout - error ', async () => {

        const loginData = { ok: false, errorMessage: 'No se pudo crear el usuario'};
        const registerData = { email: demoUser.email, displayName : demoUser.displayName, password: '123456'};

        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        await startRegisterUserWithEmailPassword( registerData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData .errorMessage) );
    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {
        
        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    });
    
});
