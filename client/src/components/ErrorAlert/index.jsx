import DangerousIcon from "@mui/icons-material/Dangerous";
import ReportIcon from "@mui/icons-material/Report";
import { Box, Typography } from "@mui/material";
import React from "react";

const defaultStyle = {
  backgroundColor: "#e34545",
  height: "100%",
  margin: "0 auto",
  padding: "1.5rem",
};

const ErrorAlert = ({
  status = "danger",
  headerMessage = "",
  styles = defaultStyle,
  errors = [],
}) => {
  const icon =
    status === "danger" ? (
      <DangerousIcon sx={{ fontSize: "43px" }} />
    ) : (
      <ReportIcon sx={{ fontSize: "43px" }} />
    );
  headerMessage = status === "danger" ? "We need your help" : headerMessage;

  return (
    <Box
      sx={{
        ...defaultStyle,
        ...styles,
      }}
    >
      {/* Header Text section  */}
      <Box display="flex">
        <Box>{icon}</Box>

        <Box marginLeft="10px">
          <Box height="30px">
            <Typography fontSize={"20px"}>{headerMessage}</Typography>
          </Box>
          <Box margin="10px 0 0 15px">
            {errors.length ? (
              <ul>
                {errors.map((err, i) => (
                  <li style={{ listStyle: "initial" }} key={i}>
                    {err}
                  </li>
                ))}
              </ul>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorAlert;
