import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Buttons from "../../Components/Buttons";
import GJNumbersView from "../../Components/GJNumbersView";
import {
  PairValuesContext,
  BitstampValuesContext,
} from "../../store/pairsContext";

const useStyles = makeStyles({
  trandingValues: {
    paddingTop: "1rem",
    minHeight: 380,
  },
  titlePair: {
    padding: "1rem",
  },
  trandingButtons: {
    borderRadius: 20,
    paddingBottom: 1,
  },
});

/**
 * *Select Bitstamp tranding values (column 2)
 *  Container component share context and states to children components
 *  select a tranding pair value and displays all values
 */
const BitstampTrading = () => {
  const styles = useStyles();
  const [buttonValues, setButtonValues] = useState();
  const [displayValue, setDisplayValue] = useState();
  const { pairValue, setPairValue } = useContext(PairValuesContext);
  const { setBitstampValues } = useContext(BitstampValuesContext);

  /**
   * Get button pair info from Api on component did mount
   */
  useEffect(() => {
    axios
      .get("https://www.bitstamp.net/api/v2/trading-pairs-info/")
      .then((res) => {
        setButtonValues(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  /**
   *  Get values from Api on button click and component did mount
   */
  useEffect(() => {
    const stringPair = pairValue.split("/").join("").toLowerCase();
    axios
      .get(`https://www.bitstamp.net/api/v2/ticker/${stringPair}/ `)
      .then((res) => {
        setDisplayValue(res.data);
        setBitstampValues(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [pairValue, setBitstampValues]);

  return (
    <div>
      <Paper elevation={3} className={styles.trandingButtons}>
        <div className={styles.titlePair}>
          <Typography variant="h6" component="h3" color="textSecondary">
            Choose the exchange pair
          </Typography>
        </div>
        <Buttons
          info={buttonValues}
          handleClick={setPairValue}
          selected={pairValue}
        />
      </Paper>
      <div className={styles.trandingValues}>
        <GJNumbersView title="Bitstamp Trading Values" data={displayValue} />
      </div>
    </div>
  );
};
export default BitstampTrading;
