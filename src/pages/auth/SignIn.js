import { Paper, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";

// import { Avatar, Paper, Typography } from "@mui/material";

import SignInComponent from "../../components/auth/SignIn";
import { ReactComponent as Logo } from "../../vendor/logo-dark.svg";

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const Brand = styled(Logo)`
  width: 150px;
  height: 50px;
  margin-bottom: 20px;
`;

const LogoCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const BigAvatar = styled(Avatar)`
//   width: 92px;
//   height: 92px;
//   text-align: center;
//   margin: 0 auto ${(props) => props.theme.spacing(5)};
// `;

function SignIn() {
  return (
    <React.Fragment>
      <Wrapper>
        <LogoCenter>
          <Brand />
        </LogoCenter>
        <Helmet title="Sign In" />
        {/* <BigAvatar alt="Lucy" src="/static/img/avatars/avatar-1.jpg" /> */}

        {/* <Typography component="h1" variant="h4" align="center" gutterBottom>
          Welcome back, Lucy!
        </Typography> */}
        <Typography component="h2" variant="body1" align="center">
          Sign in to your account to continue
        </Typography>

        <SignInComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default SignIn;
