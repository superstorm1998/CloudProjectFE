import { Grid, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListIcon from "@material-ui/icons/List";
import MenuIcon from "@material-ui/icons/Menu";
import ShareIcon from "@material-ui/icons/Share";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import clsx from "clsx";
import React from "react";
import Series from "../component/series";
import Shared from "../component/share";
import Transaction from "../component/transaction";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  table: {
    marginTop: theme.spacing(15)
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let history = useHistory();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    history.push("/");
  };

  return (
    <div>
      {/* <Button
        variant="contained"
        startIcon={<AccountCircleIcon />}
        color="primary"
        onClick={handleClick}
      /> */}
      <AccountCircleIcon fontSize="large" onClick={handleClick} />

      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemText primary="Log Out" onClick={handleLogOut} />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(1);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <Grid container>
              <Grid container item xs={10}>
                <Grid item xs={1}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid container alignItems="center" item xs={6}>
                  <Typography variant="h6" noWrap>
                    DASHBOARD
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={2} justify="center">
              <CustomizedMenus />
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={1}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Series" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={event => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <ShareIcon />
              </ListItemIcon>
              <ListItemText primary="Share Holder" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={event => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <SubtitlesIcon />
              </ListItemIcon>
              <ListItemText primary="Transaction" />
            </ListItem>
          </List>
        </Drawer>
      </Grid>

      <Grid
        item
        xs={11}
        container
        justify="center"
        alignItems="center"
        className={classes.table}
      >
        {selectedIndex === 0 && (
          <Grid item xs={9}>
            <Series />
          </Grid>
        )}
        {selectedIndex === 1 && (
          <Grid item xs={9}>
            <Shared />
          </Grid>
        )}
        {selectedIndex === 2 && (
          <Grid item xs={9}>
            <Transaction />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
