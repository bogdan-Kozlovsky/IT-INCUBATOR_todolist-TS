import React from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { FormikHelpers, useFormik } from 'formik';
import { Redirect } from 'react-router-dom';

import { useAppSelector } from 'hooks/useSelector';
import { loginTC } from 'store/auth/asyncThunks/loginTC';
import { selectIsLoggedIn } from 'store/auth/selectors';
import { useAppDispatch } from 'store/store';

type FormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const formik = useFormik({
    validate: values => {
      if (!values.email) {
        return {
          email: 'Email is required',
        };
      }
      if (!values.password) {
        return {
          password: 'Password is required',
        };
      }
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async (
      values: FormValuesType,
      formikHelpers: FormikHelpers<FormValuesType>,
    ) => {
      const action = await dispatch(loginTC(values));

      if (loginTC.rejected.match(action)) {
        if (action.payload?.fieldsErrors?.length) {
          const error = action.payload?.fieldsErrors[0];

          formikHelpers.setFieldError(error.field, error.error);
        }
      }
    },
  });

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{' '}
                <a
                  href="https://social-network.samuraijs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: bogdankozlovski18@gmail.com</p>
              <p>Password: socialPassword</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              {formik.errors.password ? <div>{formik.errors.password}</div> : null}
              <FormControlLabel
                label="Remember me"
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
