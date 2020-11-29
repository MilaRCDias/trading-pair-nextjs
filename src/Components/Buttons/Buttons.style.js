export default () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: 250,
    overflowY: "scroll",
    margin: "0.5rem 0.5rem 2.5rem ",
    borderRadius: 20,
  },
  buttonSelected: {
    backgroundColor: "#58CAA9",
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#4C68EF",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#58CAA9",
    },
  },
});
