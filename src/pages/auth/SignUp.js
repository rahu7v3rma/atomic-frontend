import { Paper, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";

import SignUpComponent from "../../components/auth/SignUp";
import { ReactComponent as Logo } from "../../vendor/logo-dark.svg";

const Brand = styled(Logo)`
  width: 150px;
  height: 50px;
  margin-bottom: 20px;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const LogoCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SignUp() {
  return (
    <React.Fragment>
      <Wrapper>
        <LogoCenter>
          <Brand />
        </LogoCenter>
        <Helmet title="Sign Up" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Get started
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Start creating the best possible user experience for you customers
        </Typography>

        <SignUpComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default SignUp;
