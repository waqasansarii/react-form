import React, { useState } from "react";
// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import SearchBar from "material-ui-search-bar";
import Menu from "@material-ui/core/Menu";
import { useHistory } from "react-router-dom";
import Form from "./Form";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  filterBtn: {
    marginLeft: "10px",
    marginRight: "10px",
    border: `1px solid `,
  },
}));

function Header() {
  const classes = useStyles();
  let history = useHistory();
  const [data, setData] = useState({ search: "" });

  const doSearch = (e) => {
    history.push({
      pathname: "search",
      search: "?search=" + data.search,
    });
    window.location.reload();
  };

  //   filter dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link
              component={NavLink}
              to="/"
              underline="none"
              color="textPrimary"
            >
              YourNextRoomates
            </Link>
          </Typography>
          <SearchBar
            placeholder={"Enter a City"}
            value={data.search}
            onChange={(newValue) => setData({ search: newValue })}
            onRequestSearch={() => doSearch(data.search)}
          />
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.filterBtn}
              variant="outlined"
              color="primary"
            >
              Any Time
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Form />
            </Menu>
          </div>
          <nav>
            <Link
              color="textPrimary"
              href="#"
              className={classes.link}
              component={NavLink}
              to="/register"
            >
              Register
            </Link>
          </nav>
          <Button
            href="#"
            color="primary"
            variant="outlined"
            className={classes.link}
            component={NavLink}
            to="/login"
          >
            Login
          </Button>
          <Button
            href="#"
            color="primary"
            variant="outlined"
            className={classes.link}
            component={NavLink}
            to="/logout"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
