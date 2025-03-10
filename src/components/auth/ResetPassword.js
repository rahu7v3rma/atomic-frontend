import {
  Button,
  Alert as MuiAlert,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import styled from "styled-components/macro";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function ResetPassword() {
  const { resetPassword } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setStatus({ success: false });
        try {
          await resetPassword(values.email);
          setStatus({ success: true });
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
              my={3}
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
          </form>
          {status?.success && (
            <Alert
              onClose={() => setStatus({ success: false })}
              mt={2}
              mb={1}
              severity="success"
            >
              Email Sent! Check your email in order to reset your password.
            </Alert>
          )}
        </>
      )}
    </Formik>
  );
}

export default ResetPassword;
