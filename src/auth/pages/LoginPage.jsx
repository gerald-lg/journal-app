import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {Link as RouterLink}  from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginUserWithEmailPassword } from '../../store/auth';

const formData = {
    email: '',
    password: ''
};

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const { formState, email, password, onInputChange } = useForm(formData);


  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginUserWithEmailPassword(formState));
  }
  
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn(email, password));
  }

  return (
      <AuthLayout title='Login'>
        <form onSubmit={ onSubmit }
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid 
            container
            spacing={ 1 }
          >
            <Grid item xs={ 12 }>
              <TextField
                id='email' 
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 }>
              <TextField 
                id='password'
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid 
                item 
                xs={ 12 }
                display={ errorMessage ? '' : 'none'} 
              >
                <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={ isAuthenticating } sx={{ padding: 1 }} variant="contained" fullWidth type="submit">Login</Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button aria-label="google-btn" disabled={ isAuthenticating } sx={{ padding: 1 }}  variant="contained" fullWidth onClick={ onGoogleSignIn }>
                  <Google />
                  <Typography sx={{ml: 1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>
      </AuthLayout>
  )
}
