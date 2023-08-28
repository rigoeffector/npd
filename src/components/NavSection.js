/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Chip,
} from "@mui/material";
import { tasksToApproveContext } from "../utils/context/contexts";

// ----------------------------------------------------------------------
const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  // color: "white",
  // color: theme.palette.text.secondary,
  color: theme.palette.third.lighter,
  "&:hover": {
    backgroundColor: "#213753",
  },
  "&:before": {
    top: 0,
    right: 0,
    width: 4,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active, count }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: "white",
    // color: "primary.main",

    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      // theme.palette.primary.main,
      theme.palette.primary.main,
      0.4
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    // color: "text.primary",
    // color: "primary.main",
    color: "white",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) =>
                          theme.transitions.create("transform"),
                        ...(isActiveSub && {
                          transform: "scale(3)",
                          bgcolor: "primary.main",
                          // bgcolor: "#fff",
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
      {count > 0 && (
        <Chip
          variant="contained"
          label={count}
          size="small"
          sx={{ color: "white", backgroundColor: "#e36952", fontWeight: 500 }}
        ></Chip>
      )}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  // const { toApproveCount } = useContext(tasksToApproveContext);
  const { pathname } = useLocation();
  const match = (path) =>
    path ? !!matchPath({ path, end: true }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) =>
          item.title === "Tasks" ? (
            <NavItem
              sx={{ color: "#c4cc36" }}
              key={item.title}
              item={item}
              active={match}
              count={4}
              // count={toApproveCount}
            />
          ) : (
            <NavItem
              key={item.title}
              item={item}
              active={match}
              sx={{ color: "#c4cc36" }}
            />
          )
        )}
      </List>
    </Box>
  );
}
