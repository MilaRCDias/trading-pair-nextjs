const baseCard = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexWrap: "wrap",
  margin: "0.5rem",
};

export default () => ({
  number: {
    fontSize: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    textAlign: "center",
    marginTop: "0.5rem",
  },
  numbersWrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    ...baseCard,
    borderRadius: 16,
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
    background: "#ffffff",
    minWidth: "12rem",
    height: "7rem",
    padding: "0.5rem",
    color: "#5378a4",
  },
  roundCard: {
    ...baseCard,
    minWidth: "11rem",
    minHeight: "12rem",
    padding: "0.55rem",
    background: "rgba(0,175,124,0.3)",
    borderRadius: "8rem",
    color: "#ffffff",
  },
});
