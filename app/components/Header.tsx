import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as LinkText,
  Switch,
} from "@mui/material";
import Link from "next/link";
import { useAuth } from "lib/useAuth";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export default function Header({ darkState, handleThemeChange }) {
  const classes = useStyles();
  const { user } = useAuth();

  const links = [
    !user && { label: "Sign Up", href: "/auth/signup" },
    !user && { label: "Sign In", href: "/auth/signin" },
    { label: "Streams", href: "/streams" },
    user && { label: "Create", href: "/streams/new" },
    user && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <Link href={href} key={href}>
          <Button color="inherit">{label}</Button>
        </Link>
      );
    });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <LinkText href="" color="inherit">
                Stream.me
              </LinkText>
            </Link>
          </Typography>
          <Switch checked={darkState} onChange={handleThemeChange} />
          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
}
