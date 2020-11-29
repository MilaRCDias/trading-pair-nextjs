import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import componentStyle from "./GJNumberLabel.style";

const useStyles = makeStyles(componentStyle, { name: "GJNumberLabel" });

/**
 * * GJNumberLabel Presentational component *
 * Displays number and laber
 *
 * @param {object} data with pair information label:number
 * @param {boolean} round option to display rounded version of card
 */
const GJNumberLabel = ({ data, round }) => {
  const style = useStyles();

  return (
    <div className={style.numbersWrap}>
      {data && Object.keys(data)?.length > 0
        ? Object.entries(data).map((dt) => {
            const numberValue =
              dt[0] === "timestamp" ? dt[1] : Number(dt[1]).toFixed(2);
            return (
              <div className={round ? style.roundCard : null} key={dt[0]}>
                <div className={round ? style.roundCard : null}>
                  <div m={2} className={round ? style.roundCard : style.card}>
                    <div className={style.number}>{numberValue} </div>
                    <div className={style.label}> {dt[0]} </div>
                  </div>
                </div>{" "}
              </div>
            );
          })
        : Array.from(new Array(round ? 1 : 9)).map((data, idx) => (
            <Box key={idx} m={2}>
              {" "}
              <Skeleton
                className={style.number}
                variant={round ? "circle" : "rect"}
                width={round ? 250 : 200}
                height={round ? 250 : 100}
                animation="wave"
              />
            </Box>
          ))}
    </div>
  );
};

GJNumberLabel.defaultProps = {
  data: {},
  round: false,
};

GJNumberLabel.propTypes = {
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  round: PropTypes.bool,
};

export default GJNumberLabel;
