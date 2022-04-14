import { Button, Dialog } from "@mui/material";
import React from "react";
import Slide from "@mui/material/Slide";
import { Box, styled } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DkAlertComfirm = (props) => {
  const { content, isOpen, onClose, Comfirm, textNO, textYES } = props;

  const handleOnClose = () => {
    onClose();
  };

  const handleOnComfirm = () => {
    Comfirm();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            background: "f9f6e4",
            border: "5px solid #C28558",
            boxSizing: "border-box",
            boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)",
            borderRadius: "36px",
            margin: {
              xs: "5px",
            },
            padding: {
              xs: "20px",
              md: "40px 70px",
            },
            minWidth: {
              md: "530px",
            },
          },
        }}
      >
        <BoxContent>{content}</BoxContent>

        <BoxButton>
          <Button variant="contained" onClick={handleOnClose} color="warning">
            {textNO}
          </Button>

          <Button variant="contained" onClick={handleOnComfirm} color="warning">
            {textYES}
          </Button>
        </BoxButton>
      </Dialog>
    </>
  );
};

export default DkAlertComfirm;

const BoxContent = styled(Box)({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "32px",
  lineHeight: "45px",
  textAlign: "center",
  color: "rgb(207, 77, 0)",
  margin: "15px 0px 45px 0px ",
});

const BoxButton = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  textAlign: "center",
  fontWeight: 400,
  fontSize: "24px",
  lineHeight: "34px",
});
