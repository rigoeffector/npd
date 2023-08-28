import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx, color }) {
  if (color === "white") {
    return (
      <Box
        component="img"
        src="/images/logo.png"
        sx={{ ...sx }}
      />
    );
  }
  return <Box component="img" src="/images/logo.png" sx={{ ...sx }} />;
}
