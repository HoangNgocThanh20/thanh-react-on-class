import { styled } from "@mui/system";

export const ProductAddWrapper = styled("form")({
  backgroundColor: "#ffff",
  height: "100%",
  margin: "40px",
  padding: "50px",
  borderRadius: "10px",

  ".fieldWrapper": {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",

    ".titleField": {
      fontSize: "20px",
      width: "200px",
    },
  },

  'p.Mui-error': {
    position: 'absolute',
    bottom: '-20px'
  }
});
