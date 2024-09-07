import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

const FluButton = ({ handleClick, fluType }) => {
  const buttons = [
    <Button
      key="one"
      onClick={(e) => handleClick(e.currentTarget.textContent)}
      variant={fluType == "腸病毒" ? "contained" : "outlined"}
    >
      腸病毒
    </Button>,
    <Button
      key="two"
      onClick={(e) => handleClick(e.currentTarget.textContent)}
      variant={fluType == "登革熱" ? "contained" : "outlined"}
    >
      登革熱
    </Button>,
    <Button
      key="three"
      onClick={(e) => handleClick(e.currentTarget.textContent)}
      variant={fluType == "COVID" ? "contained" : "outlined"}
    >
      COVID
    </Button>,
  ];
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup aria-label="Medium-sized button group">{buttons}</ButtonGroup>
    </Box>
  );
};

export default FluButton;
