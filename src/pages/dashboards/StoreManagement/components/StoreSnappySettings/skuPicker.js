import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Select } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  selectStoreStyle: {
    borderRadius: "5px",
    height: "40px",
    width: "30%",
    fontWeight: "bold",
    marginTop: "4px",
    "& fieldset": {
      borderWidth: "2px",
    },
  },
});

export default function SKUPicker({ value, onSelect, skuList }) {
  const classes = useStyles();

  const handleStoreChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <Select
      className={classes.selectStoreStyle}
      labelId="sku-to-select-label"
      id="sku-to-select"
      value={value}
      onChange={handleStoreChange}
    >
      <MenuItem selected={true} disabled={true} key="all" value="all">
        Select SKU
      </MenuItem>
      {skuList.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
