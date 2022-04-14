import { Box, styled } from "@mui/system";

export const ProductWrapper = styled(Box)({
  padding: "20px 100px 100px 100px",

  ".titleHeader": {
    fontSize: "26px",
    marginBottom: "50px",
    fontWeight: "500",
    maxWidth: "200px",
    padding: "40px",
    border: "4px solid #C28558",
    margin: "auto",
    textAlign: "center",
    borderRadius: "30px",
    backgroundColor: "#F9F6E4",
  },

  ".addBtn": {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },

  th: {
    fontWeight: "600",
  },

  ".fieldWrapper": {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    marginBottom: "20px",

    ".titleField": {
      marginRight: "20px",
    },
  },
});
