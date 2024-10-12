import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixture";

describe('Pruebas en el AuthSlice', () => {

  test('debe de regresar el estado inicial y llamarse "auth"', () => {
    
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe('auth');


  });

  test('debe de autenticar el usuario', () => {

    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
        status: 'authenticated',
        uid: demoUser.uid,
        email: demoUser.email,
        displayName: demoUser.displayName,
        photoURL: demoUser.photoURL,
        errorMessage: null
    });
    
  });
  test('debe de realizar el logout', () => {

    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
        status: 'not-authenticated',
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    });

  });

  test('debe de realizar el logout y mostrar un mensaje de error', () => {
    const messageError = 'Hubo un error al realizar el logout'
    const state = authSlice.reducer(authenticatedState, logout(messageError));
    expect(state).toEqual({
        status: 'not-authenticated',
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: messageError
    });
  });

  test('debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer(initialState, checkingCredentials());
    expect(state.status).toBe('checking');
  });
  
  
  
});
