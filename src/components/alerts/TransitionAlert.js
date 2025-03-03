import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useEffect } from "react";

export default function TransitionAlerts({ alert }) {
  const [erroropen, setErrorOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [existOpen, setExistOpen] = React.useState(false);

  useEffect(() => {
    if (alert.errorAlert === true) {
      setErrorOpen(true);
    }
    if (alert.successAlert === true) {
      setSuccessOpen(true);
    }
    if (alert.alreadyExist === true) {
      setExistOpen(true);
    }
    const timeoutId = setTimeout(() => {
      setErrorOpen(false);
      setSuccessOpen(false);
      setExistOpen(false);
    }, 5000); //this will auto close alert popup after 5 seconds

    return () => {
      clearTimeout(timeoutId);
    };
  }, [alert]);

  return (
    <>
      <Box
        sx={{
          marginTop: "65px",
          position: "absolute",
          top: "30px",
          right: "20px",
        }}
      >
        <Collapse in={erroropen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setErrorOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert?.messageFailure || "ASIN wasn't found"}
          </Alert>
        </Collapse>
        <Collapse in={existOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setExistOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert?.messageExist || "ASIN already exist"}
          </Alert>
        </Collapse>
        <Collapse in={successOpen}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => {
                  setSuccessOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert?.messageSuccess || "New Competitor added"}
          </Alert>
        </Collapse>
      </Box>
    </>
  );
}
