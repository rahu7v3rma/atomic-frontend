import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  Alert as MuiAlert,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function NewPassword(props) {
  const { newPassword } = useAuth();
  const navigate = useNavigate();
  const { id } = props;
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const onClickShowPassword = (passwordType) => {
    setShowPassword((show) => ({
      ...show,
      [passwordType]: !showPassword[passwordType],
    }));
  };
  const onMouseDownShowPassword = (event) => event.preventDefault();
  const ShowPasswordIcon = ({ passwordType }) => (
    <InputAdornment position="end">
      <IconButton
        onClick={() => onClickShowPassword(passwordType)}
        onMouseDown={onMouseDownShowPassword}
        edge="end"
      >
        {showPassword[passwordType] ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Formik
      initialValues={{
        new_password: "",
        confirm_password: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        new_password: Yup.string()
          .required("New Password is required")
          .min(6, "New password require minimum 6 characters")
          .matches(/^\S+$/, "New Password cannot contain whitespace"),
        confirm_password: Yup.string()
          .required("Confirm Password is required")
          .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setStatus({ success: false });
        let apidata = {
          id: id.trim(),
          password: values.new_password,
        };
        try {
          let res = await newPassword(apidata);
          if (res.status) {
            setStatus({ success: true });
          }
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
        setStatus,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <>
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            {!status?.success && (
              <>
                {" "}
                <TextField
                  type={showPassword.newPassword ? "text" : "password"}
                  name="new_password"
                  label="Enter new password"
                  value={values.new_password}
                  error={Boolean(touched.new_password && errors.new_password)}
                  fullWidth
                  helperText={touched.new_password && errors.new_password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                  InputProps={{
                    endAdornment: (
                      <ShowPasswordIcon passwordType="newPassword" />
                    ),
                  }}
                />
                <TextField
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirm_password"
                  label="Confirm password"
                  value={values.confirm_password}
                  error={Boolean(
                    touched.confirm_password && errors.confirm_password
                  )}
                  fullWidth
                  helperText={
                    touched.confirm_password && errors.confirm_password
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                  sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  InputProps={{
                    endAdornment: (
                      <ShowPasswordIcon passwordType="confirmPassword" />
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Reset password
                </Button>
              </>
            )}
          </form>
          {status?.success && (
            <Alert
              onClose={() => {
                setStatus({ success: false });
                navigate("/auth/sign-in");
              }}
              mt={2}
              mb={1}
              severity="success"
            >
              Your password has been updated
            </Alert>
          )}
        </>
      )}
    </Formik>
  );
}

export default NewPassword;
