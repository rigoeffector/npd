/* eslint-disable no-unused-vars */
import React from "react";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Alert, Grid } from "@mui/material";

const Login = (props, { className, ...rest }) => {
  const LOGIN_USER_RESET = "LOGIN_USER_RESET";
  const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";

  const dispatch = useDispatch();
  const {
    auth: { data, loading, message, success, error },
  } = useSelector((state) => state);
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClose = () => {
    dispatch({ type: LOGIN_USER_RESET });
  };
  return (
    <Box
      sx={{
        height: "100vh",
        textAlign: "left",
        alignItems: "center",
        alignSelf: "center",
        display: "flex",
        flexWwrap: "nowrap",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12} xl={12}>
        <Logo sx={{ width: 200, pb: 2 }} />
      </Grid>
      <h3>Welcome Back ,Please login</h3>
      <Box
        sx={{
          width: "100%",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <React.Fragment>
          <Formik
            initialValues={{
              username: "admin@gmail.com",
              password: "12345",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .email("Must be a valid username")
                .max(255)
                .required("Username is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={async (values) => {
              const payload = {
                ...values,
              };
              dispatch({ type: LOGIN_USER_REQUEST, payload });
              // window.location.reload();
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form
                noValidate
                onSubmit={handleSubmit}
                {...rest}
                style={{
                  width: "30%",
                }}
              >
                <Box
                  sx={{
                    margin: "20px 0px",
                  }}
                >
                  <FormControl
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login">
                      {" "}
                      Username
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.username}
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Username"
                    />
                    {touched.username && errors.username && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                      >
                        {" "}
                        {errors.username}{" "}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>

                <FormControl
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password-login">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {" "}
                      {errors.password}{" "}
                    </FormHelperText>
                  )}
                </FormControl>

                {errors.submit && (
                  <Box mt={3}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}

                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    disabled={isSubmitting || loading}
                  >
                    {"Sign In"}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          {!success && !loading && message && (
            <Alert
              variant="filled"
              severity="error"
              message={message}
              handleClose={handleClose}
            />
          )}
        </React.Fragment>
      </Box>
    </Box>
  );
};

export default Login;
