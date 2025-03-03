import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components/macro";

import NewPassword from "../../components/auth/NewPassword";
import ResetPasswordComponent from "../../components/auth/ResetPassword";
import useAuth from "../../hooks/useAuth";
import { ReactComponent as Logo } from "../../vendor/logo-dark.svg";

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

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const Label = styled.span`
  color: #000000;
`;

const SignDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-top: 10px;
`;
function ResetPassword() {
  const { checkResetStatus } = useAuth();
  const [resetStatus, setResetStatus] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const location = useLocation();
  const resetUrl = location.pathname.includes("reset_password");
  const pathName = location.pathname?.split("/");
  const getId = pathName[3];
  const timeStamp = pathName[4];
  const resetStatusCheck = async () => {
    try {
      let res = await checkResetStatus(getId, timeStamp);
      setResetStatus(res?.data?.success);
    } catch (error) {
      setResetStatus(false);
    }
    setIsLoad(true);
  };
  if (getId !== undefined) {
    resetStatusCheck();
  }

  useEffect(() => {
    if (getId === undefined) {
      setIsLoad(true);
    }
  }, [getId]);
  useEffect(() => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const remainingTime = parseInt(timeStamp) - currentTimestamp;
    if (remainingTime <= 0) {
      setIsExpired(true);
    } else {
      setIsExpired(false);
    }
  }, [timeStamp]);
  return (
    <React.Fragment>
      <Wrapper>
        <LogoCenter>
          <Brand />
        </LogoCenter>
        {isLoad ? (
          !resetStatus ? (
            <Typography component="h1" variant="h3" align="center" gutterBottom>
              Link got Expired!
            </Typography>
          ) : isExpired ? (
            <Typography component="h1" variant="h3" align="center" gutterBottom>
              Link got Expired!
            </Typography>
          ) : (
            <>
              <Helmet title="Reset Password" />

              <Typography
                component="h1"
                variant="h4"
                align="center"
                gutterBottom
              >
                Reset Password
              </Typography>
              {resetUrl ? (
                ""
              ) : (
                <Typography component="h2" variant="body1" align="center">
                  Enter your email to reset your password
                </Typography>
              )}

              {resetUrl ? (
                <NewPassword id={getId} />
              ) : (
                <ResetPasswordComponent />
              )}

              <SignDiv>
                <Label> Have an account? </Label>&nbsp;&nbsp;
                <Link
                  to="/auth/sign-in"
                  style={{ color: "#366FCF", textDecoration: "none" }}
                >
                  Sign in
                </Link>
              </SignDiv>
              {/* </div> */}
            </>
          )
        ) : null}
      </Wrapper>
    </React.Fragment>
  );
}

export default ResetPassword;
