import { InputAdornment, TableCell, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components/macro";

const CustomTextField = styled(TextField)({
  "& .MuiInput-input.Mui-disabled": {
    "-webkit-text-fill-color": "black",
  },
});

export default function EditableTableCell(props) {
  const { field, value, edit, onEdit, suffix } = props;
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputOnChange = (e) => {
    setInputValue(e.target.value);
    onEdit(e);
  };

  return (
    <TableCell align="right">
      {Array.isArray(value) ? (
        <div>{value.join(", ")}</div>
      ) : (
        <CustomTextField
          disabled={!edit}
          size="small"
          margin="none"
          variant="standard"
          onInput={handleInputOnChange}
          name={field}
          value={inputValue}
          InputProps={{
            startAdornment: suffix ? (
              <InputAdornment position="start">{suffix}</InputAdornment>
            ) : (
              ""
            ),
          }}
        />
      )}
    </TableCell>
  );
}
