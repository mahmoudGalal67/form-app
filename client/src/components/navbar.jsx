import React from 'react'
import{Toolbar , AppBar , Typography } from "@material-ui/core"

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">Bootcamps</Typography>
      </Toolbar>
    </AppBar>
  );
};


export default Navbar

