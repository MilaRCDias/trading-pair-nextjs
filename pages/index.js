import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import MainContainer from "../src/Containers/MainContainer";
import Header from "../src/Components/Header";

const useStyles = makeStyles({
  main: {
    marginBottom: "4rem",
  },
  pageContainer: {
    backgroundColor: "#f1f7fe",
    paddingBottom: "6rem",
  },
});

/**
 * * App View page
 *
 */

const App = () => {
  const styles = useStyles();

  return (
    <div className={styles.pageContainer}>
      <Grid item xs={12} className={styles.main}>
        <Header />
      </Grid>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <MainContainer />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
