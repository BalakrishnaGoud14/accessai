import React from "react";
// src/components/ErrorBanner.jsx
import {
  Alert,
  AlertTitle,
  IconButton,
  Collapse,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";

export default function ErrorBanner({
  open = false,
  message = "",
  title = "Error",
  severity = "error",
  onClose,
  autoHideDuration = 6000,
  action
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    onClose?.();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ mt: 2 }}
    >
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <>
              {action}
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
                sx={{ ml: 1 }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </>
          }
          sx={{
            width: { xs: '100%', sm: 600 },
            boxShadow: 3,
            '& .MuiAlert-icon': {
              fontSize: 24,
            },
          }}
        >
          <AlertTitle sx={{ fontWeight: 600 }}>
            <ErrorIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            {title}
          </AlertTitle>
          <div>{message}</div>
        </Alert>
      </Collapse>
    </Snackbar>
  );
}
