import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Alert as MuiAlert,
  TextField as MuiTextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { spacing } from "@mui/system";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);
const SignUpDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-top: 15px;
`;
const ForgotDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-top: 10px;
`;

function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.email, values.password);

          navigate("/store-management");
        } catch (error) {
          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
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
        <form noValidate onSubmit={handleSubmit}>
          {/* <Alert mt={3} mb={3} severity="info">
            Use <strong>demo@bootlab.io</strong> and{" "}
            <strong>unsafepassword</strong> to sign in
          </Alert> */}
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
          <ForgotDiv>
            <Link
              to="/auth/reset-password"
              style={{ color: "#366FCF", textDecoration: "none" }}
            >
              Forgot password
            </Link>
          </ForgotDiv>

          <SignUpDiv>
            <span>Don't have an account?</span>&nbsp;&nbsp;
            <Link
              to="/auth/sign-up"
              style={{ color: "#366FCF", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </SignUpDiv>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
