import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import { rgba } from "polished";
import React from "react";
import {
  BookOpen as BookOpenIcon,
  Code as CodeIcon,
  Figma as FigmaIcon,
  Mail as MailIcon,
  PlusCircle as PlusCircleIcon,
  Users as UsersIcon,
} from "react-feather";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  ${spacing};
  background: ${(props) => props.theme.palette.background.paper};
  text-align: center;
`;

const TypographyOverline = styled(Typography)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const FeatureWrapper = styled.div`
  display: flex;
  text-align: left;
  padding: 18px 20px;
`;

const FeatureIcon = styled.div`
  svg {
    flex-shrink: 0;
    width: auto;
    height: 48px;
    width: 48px;
    background: ${(props) => rgba(props.theme.palette.primary.main, 0.15)};
    color: ${(props) => props.theme.palette.primary.main};
    padding: 10px;
    border-radius: 50%;
  }
`;

const ArrowForward = styled(ArrowForwardIcon)`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

const Feature = ({ Icon, title, description }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <FeatureWrapper>
        <FeatureIcon>
          <Icon />
        </FeatureIcon>
        <Box ml={6}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </FeatureWrapper>
    </Grid>
  );
};

function Features() {
  return (
    <Wrapper py={20}>
      <Container>
        <TypographyOverline variant="body2" gutterBottom>
          Features
        </TypographyOverline>
        <Typography variant="h2" component="h3" gutterBottom>
          Developers love Material App
        </Typography>
        <Box mb={8} />
        <Grid container spacing={6}>
          <Feature
            Icon={CodeIcon}
            title="Modern Technology Stack"
            description="Material App is built to make your life easier. Theme provider, build tooling, documentation, and 400+ components. "
          />
          <Feature
            Icon={PlusCircleIcon}
            title="Multiple Plugins"
            description="Various third-party plugins are fully integrated, like Chart.js, FullCalendar, WYSIWYG Editors, Formik and Yup."
          />
          <Feature
            Icon={MailIcon}
            title="Dev-to-Dev Support"
            description="Our themes are supported by specialists who provide quick and effective support. Usually an email reply takes <24h."
          />
          <Feature
            Icon={UsersIcon}
            title="Authentication Examples"
            description="The package comes with fully working authentication examples, including Firebase, Auth0, AWS Cognito and JWT."
          />
          <Feature
            Icon={BookOpenIcon}
            title="Detailed Documentation"
            description="We've written extensive documentation for the plugins and tools we're using, varying from Redux to ESLint."
          />
          <Feature
            Icon={FigmaIcon}
            title="Figma/Sketch Assets"
            description="Designers, we've got you covered. Sketch & Figma files are available in the Standard Plus and Extended License."
          />
        </Grid>

        <Box mt={4}>
          <Button
            component={NavLink}
            to="/documentation/welcome"
            variant="contained"
            color="secondary"
            size="large"
            target="_blank"
          >
            Open Documentation
            <ArrowForward />
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default Features;
