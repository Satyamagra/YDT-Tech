import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { NavLink, HashRouter, Switch, Route } from "react-router-dom";

import clsx from "clsx";

import List from "@material-ui/core/List";
import { ListItem } from "@material-ui/core";
import LocalStorage from "../LocalStore/LocalStorage";

import AddStudent from "./AddStudent";
import StudentList from "./StudentList";
import StudentSearch from "./StudentSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [Sidebar, setSidebar] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSideBar = () => {
    setSidebar(true);
  };
  const handleSideBarClose = () => {
    setSidebar(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout=()=>{
    LocalStorage.removeUser();
    window.location.href="/";
  }
  const list = () => (
    <div role="presentation" className={clsx(classes.list)}>
      <h1>Student Data</h1>
      <List>
        <ListItem spacing={2}>
          <Button fullWidth variant="contained">
            <NavLink
              fullWidth
              className="remove"
              activeStyle={{
                fontWeight: "bold",
                color: "green",
                textDecoration: "none",
              }}
              to="/user/addstudent"
            >
              Add Student
            </NavLink>
          </Button>
        </ListItem>
        <ListItem>
          <Button fullWidth variant="contained">
            <NavLink
              fullWidth
              className="remove"
              activeStyle={{
                fontWeight: "bold",
                color: "green",
                textDecoration: "none",
              }}
              to="/user/studentlist"
            >
              Student List
            </NavLink>
          </Button>
     </ListItem>
     <ListItem>
          <Button fullWidth variant="contained">
            <NavLink
              fullWidth
              className="remove"
              activeStyle={{
                fontWeight: "bold",
                color: "green",
                textDecoration: "none",
              }}
              to="/user/studentSearch"
            >
              Student Search
            </NavLink>
          </Button>
     </ListItem>
      </List>
    </div>
  );
  return (
    <HashRouter>
    <div className={classes.root}>
      <AppBar position="static" className="dash">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon onClick={handleSideBar} />
          </IconButton>

          <React.Fragment>
            <SwipeableDrawer open={Sidebar} onClose={handleSideBarClose}>
              {list()}
            </SwipeableDrawer>
          </React.Fragment>

          <Typography variant="h6" className={classes.title}>
            YDT TECH
          </Typography>
          <Typography variant="h6" style={{marginRight:"1%"}}>
            hello! {LocalStorage.getUser()[0].fullname}
          </Typography>
          <Button variant="outlined" color="secondary" onClick={Logout}>LogOut</Button>
        </Toolbar>
      </AppBar>
      
    </div>
    <Switch>
    <Route path="/user/addstudent"  component={AddStudent} />
            <Route path="/user/studentlist" component={StudentList} />
            <Route path="/user/studentSearch" component={StudentSearch} />
    </Switch>
    </HashRouter>
  );
}
