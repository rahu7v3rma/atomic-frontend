import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import React from "react";

const MyComponent = styled("div")({
  minWidth: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const MyButton = styled("div")({
  paddingLeft: "60px",
  paddingRight: "60px",
});
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MyComponent>
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid lg={12} md={12} sm={1} xs={1} />
              <Grid
                lg={12}
                md={12}
                sm={10}
                xs={10}
                align="center"
                justify="center"
              >
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "45ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Card>
                    <div>
                      <h1>Login</h1>
                    </div>
                    <div />
                    <form>
                      <div>
                        <TextField
                          id="Email"
                          label="Enter Email"
                          type="email"
                          variant="standard"
                          required
                        />
                      </div>
                      <div>
                        <TextField
                          id="Password"
                          label="Enter Password"
                          type="password"
                          variant="standard"
                          required
                        />
                      </div>
                      <MyButton>
                        <br />
                        <Button
                          type="submit"
                          variant={"contained"}
                          color={"secondary"}
                          fullWidth
                        >
                          Login
                        </Button>
                      </MyButton>
                      <br />
                      <div>
                        <span>
                          If user not exiting go to SignUp first ? &nbsp;&nbsp;
                        </span>
                        {""}
                        <span>
                          <a href="register">SignUp</a>
                        </span>
                      </div>
                    </form>
                    <br />
                  </Card>
                </Box>
              </Grid>
              <Grid lg={11} md={11} sm={1} xs={1} />
            </Grid>
          </Box>
        </Container>
      </MyComponent>
    );
  }
}
export default Login;
