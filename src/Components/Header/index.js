import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import componentStyle from "./Header.style";

const useStyles = makeStyles(componentStyle, {
  name: "Header",
});

/**
 * *Header Presentational component
 * Display logo in navbar
 */

const Header = () => {
  const style = useStyles();

  return (
    <div className={style.navbar}>
      <Box p={2} className={style.logo}>
        <Typography variant="h4" component="h1">
          Trading Pairs
        </Typography>
      </Box>
    </div>
  );
};
export default Header;
