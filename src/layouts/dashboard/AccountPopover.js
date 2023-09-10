/* eslint-disable no-unused-vars */
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../utils/context/AuthContext";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
import history from "../../history";
import { useSelector } from "react-redux";
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const {
    auth: { data, loading, message, success, error },
  } = useSelector((state) => state)
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const logout =()=>{
    localStorage.clear();
    history.push('/login')
    window.location.reload();
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* {userData && ( */}
        <IconButton
          ref={anchorRef}
          onClick={handleOpen}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
          }}
        >
          <Avatar src={'/images/user.jpeg'} />
        </IconButton>
      {/* )} */}

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {data?.fname} {data?.lname}{" "}
           
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {data?.role === 'super'? 'Admin': data?.role}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
