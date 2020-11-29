import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles, Typography } from "@material-ui/core";
import GJNumbersView from '../../Components/GJNumbersView'
 import {
  PairValuesContext,
  BitstampValuesContext,
} from "../../store/pairsContext";

const useStyles = makeStyles({
  tradePair: {
    marginBottom: "2rem",
  },
});

/**
 *  *Average ticker container (column 1)
 * Container component with api calls and states to children components
 * Get values from 3 different apis and calculates average
 *  */

const AverageTicker = () => {
  const [coinbaseValue, setCoinbaseValue] = useState();
  const [bitfinexValue, setBitfinexValue] = useState();
  const [averageValue, setAverageValue] = useState("");

  const { pairValue } = useContext(PairValuesContext);
  const { bitstampValues } = useContext(BitstampValuesContext);

  const splitSymbol = pairValue.split("/");
  const symbolValue = splitSymbol.join("");
  const symbolCoinbase = splitSymbol[0];
  const currencyCoinbase = splitSymbol[1];
  const style = useStyles();
  /**
   * Function to calculate average of exchange rates
   */
  const calculateResult = (arrayValue) => {
    const divider = arrayValue.filter((e) => e !== null).length;
    const sum = arrayValue.reduce((acc, currentValue) => acc + currentValue);
    const average = sum / divider;
    setAverageValue({ [`Average of ${divider} sources`]: average.toFixed(2) });
  };

  /**
   * Bitfinex websocket connection, react lifecycle hook
   */
  useEffect(() => {
    const wss = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    wss.onmessage = (msg) => {
      let value = JSON.parse(msg.data);
      if (value.event === "error") {
        setBitfinexValue(null);
      }
      if (value[0]) {
        const arrayFixRate = value.flat();
        const averageFixRate =
          typeof arrayFixRate[1] === "string" ? 0 : arrayFixRate[1];
        setBitfinexValue(averageFixRate);
      }
    };

    let msg = JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: `t${symbolValue}`,
    });
    wss.onopen = () => {
      wss.send(msg);
    };

    return () => {
      wss.close();
    };
  }, [pairValue, symbolValue]);

  /**
   * Coinbase http call, react lifecycle hook
   */
  useEffect(() => {
    axios
      .get(
        `https://api.coinbase.com/v2/exchange-rates?currency=${symbolCoinbase}`
      )
      .then((res) => {
        if (res.data.data.rates[currencyCoinbase] === undefined) {
          setCoinbaseValue(null);
        } else {
          setCoinbaseValue(Number(res.data.data.rates[currencyCoinbase]));
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [symbolCoinbase, currencyCoinbase]);

  /**
   * Component update on change values of rates and calculate the average
   */
  useEffect(() => {
    if (bitstampValues === undefined || !coinbaseValue) return;
    calculateResult([
      Number(bitstampValues.high),
      coinbaseValue,
      bitfinexValue,
    ]);
  }, [bitstampValues, coinbaseValue, bitfinexValue]);

  return (
    <div>
    
      <GJNumbersView title="Average ticker value" data={averageValue} round />
 
      <Typography
        color="textSecondary"
        variant="h3"
        align="center"
        className={style.tradePair}
      >{`${symbolCoinbase} => ${currencyCoinbase}`}</Typography>
    </div>
  );
};
export default AverageTicker;
