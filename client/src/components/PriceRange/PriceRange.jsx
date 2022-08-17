import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const IOSSlider = styled(Slider)(({ theme }) => ({
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 10,
    width: 10,
    background: "#242424",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    background: "#242424",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    background:
      "linear-gradient(93.77deg, #ABAFE9 5.59%, #B5E0FD 99.02%)",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
  },
}));

export const RangeSlider = ({
  setRange,
  range,
  min,
  max,
}) => {
  const handleChange = (event, newValue) => {
    setRange(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <IOSSlider
        value={range}
        min={min}
        max={max}
        onChange={handleChange}
        disableSwap
      />
    </Box>
  );
};
