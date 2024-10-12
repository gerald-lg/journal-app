import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixture";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginUserWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginUserWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginUserWithEmailPassword({email, password})
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(), 
}) )


describe('test en LoginPage', () => {

    beforeEach(() => jest.clearAllMocks() );

    test('debe de mostrar el componente correctamente', () => { 

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        
        );

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('Botón de Google debe de llamar startGoogleSignIn', async () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        
        );

        const button = screen.getByLabelText('google-btn');
        fireEvent.click(button);

        expect( mockStartGoogleSignIn ).toHaveBeenCalledTimes( 1 );

    });

    test('debe de llamar startLoginWithEmailPassword', () => {

        const email    = 'g.lopez@google.com';
        const password = '123qwe123';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        const passwordField = screen.getByLabelText('Contraseña');
        fireEvent.change(emailField, { target: { value: email } });
        fireEvent.change(passwordField, { target: { value: password } });

        const buttonLoginIn = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(buttonLoginIn);

        expect( mockStartLoginUserWithEmailPassword ).toHaveBeenCalledWith({ email, password })
    });
    
})
