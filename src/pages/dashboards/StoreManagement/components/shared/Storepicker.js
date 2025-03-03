import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Select } from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";

import { setStore } from "../../../../../redux/slices/store_analytics";
import { storeNames } from "../../constants";

export default function StorePicker({
  value,
  onStoreSelected,
  style = {},
  disabled = false,
}) {
  const dispatch = useDispatch();
  const stores = useMemo(() => storeNames, []);
  const useStyles = makeStyles({
    selectStoreStyle: {
      borderRadius: "10px",
      height: "40px",
      fontWeight: "bold",
      margin: "4px",
      "& fieldset": {
        borderWidth: "2px",
      },
    },
    customStyle: style,
    selectedMenuItem: {
      backgroundColor: "#ffffff !important",
    },
  });

  const classes = useStyles();

  const handleStoreChange = (event) => {
    let name = stores.filter((x) => x.value === event.target.value)[0].value;
    onStoreSelected(name);
    dispatch(setStore(name));
  };

  return (
    <Select
      className={`${classes.selectStoreStyle} ${classes.customStyle}`}
      labelId="store-to-select-label"
      id="store-to-select"
      value={value}
      onChange={handleStoreChange}
      disabled={disabled}
      MenuProps={{
        PaperProps: {
          sx: {
            "& .MuiMenuItem-root.Mui-selected": {
              backgroundColor: "rgba(55,111,208,0.08) !important",
            },
            "& .MuiMenuItem-root:hover": {
              backgroundColor: "rgba(0,0,0,0.04) !important",
            },
          },
        },
      }}
    >
      <MenuItem selected={true} disabled={true} key="all" value="all">
        Select Store
      </MenuItem>
      {stores.map((option, index) => (
        <MenuItem
          key={`${option.value} + ${index}`}
          value={option.value}
          className={classes.selectedMenuItem}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
