import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Box } from "@material-ui/core";
import GJNumberLabel from "../GJNumberLabel";

/**
 * *GJNumbersView Presentational component
 * Displays title and GJNumbersLabel
 * @param {string} title
 * @param {object} data
 * @param {boolean} round
 */
const GJNumbersView = ({ title, data, round }) => {
  return (
    <Grid container>
      <Box my={4} mx="auto">
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <GJNumberLabel data={data} round={round} />
        </Grid>
      </Box>
    </Grid>
  );
};

GJNumbersView.defaultProps = {
  title: "",
  data: {},
  round: false,
};

GJNumbersView.propTypes = {
  title: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  round: PropTypes.bool,
};

export default GJNumbersView;
