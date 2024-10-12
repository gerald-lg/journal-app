import { useMemo, useState } from 'react';

import {Link as RouterLink}  from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'

import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterUserWithEmailPassword } from '../../store/auth';

const formData = {
  displayName: '',
  email: '',
  password: ''
};

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener una @' ],
  displayName: [ (value) => value.trim().length > 0 && value.length >= 1, 'Debe ingresar un nombre' ],
  password: [ (value) => value.trim().length > 0 && value.length >= 6, 'Debe ingresar un password' ]
}


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth );

  const isChecking = useMemo(() => status === 'checking', [status]);

  const { formState,displayName, email, password, onInputChange,
          isFormValid, displayNameValid, emailValid, passwordValid
        } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);
    
    if(! isFormValid) return;
    
    dispatch(startRegisterUserWithEmailPassword(formState));
  }

  return (
      <AuthLayout title='Register'>
        <form 
          onSubmit={ onSubmit }
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid 
            container
            spacing={ 1 }
          >
            <Grid item xs={ 12 }>
              <TextField 
                label="Name"
                type="text"
                placeholder="Name"
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !! displayNameValid && formSubmitted}
                helperText={ displayNameValid }
                
              />
            </Grid>

            <Grid item xs={ 12 }>
              <TextField 
                label="Email"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !! emailValid && formSubmitted}
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 }>
              <TextField 
                label="Password"
                type="password"
                placeholder="password"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !! passwordValid && formSubmitted}
                helperText={ passwordValid }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid 
                item 
                xs={ 12 }
                display={ errorMessage ? '' : 'none'} 
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={ 12 }>
                <Button disabled={ isChecking } type="submit" sx={{ padding: 1 }} variant="contained" fullWidth>Create</Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>Do you have an account?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Login
              </Link>
            </Grid>

          </Grid>
        </form>
      </AuthLayout>
  )
}
