import {
  Grid,
  Avatar as MuiAvatar,
  Container as MuiContainer,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  ${spacing};
  background: ${(props) => props.theme.palette.background.paper};
  text-align: center;
`;

const Container = styled(MuiContainer)`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Avatar = styled(MuiAvatar)`
  ${spacing};
  width: 48px;
  height: 48px;
`;

const AvatarWrapper = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing(3)};
`;

function Testimonial() {
  return (
    <Wrapper pt={10} pb={20}>
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h2" component="h3" gutterBottom>
              &quot;Material App is one of the best advanced React dashboard
              templates for developers.&quot;
            </Typography>
            <AvatarWrapper>
              <a
                href="https://twitter.com/olivtassinari"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <Avatar src="/static/img/avatars/olivier.jpg" mr={3} />
              </a>
              <Typography color="textSecondary" variant="body2">
                Olivier Tassinari,
                <br />
                Co-Founder Material-UI
              </Typography>
            </AvatarWrapper>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default Testimonial;
