import { Button, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  createAsinTrackingData,
  productDetailSelector,
} from "../../../../../redux/slices/product_detail";

const AddCompetInput = styled(TextField)`
  & fieldset {
    border: none;
  }
`;

const SaveCompetBtn = styled(Button)`
  font-size: 14px;
  font-family: "Inter", sans-serif;
  border-radius: 5px;
  background-color: #3eb0fd;
  padding: 5px 10px;
  margin-left: 10px;
`;

const AddCompetButton = styled(Button)`
  background-color: #f1f8ff !important;
  color: #3f97fe;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #f1f8ff;
`;

const CompetitorsInput = ({ store, parentAsin, openKey }) => {
  const dispatch = useDispatch();
  const { trackedASINsData } = useSelector(productDetailSelector);
  const [addCompetInput, setCompetInput] = useState("");
  const [selectedAsinsData, setselectedAsinsData] = useState([]);

  const handleCompetInput = useCallback(
    (event) => {
      const data = trackedASINsData.filter((el) => el.parent_asin === openKey);
      setselectedAsinsData([...data]);
      setCompetInput(event.target.value);
    },
    [openKey, trackedASINsData]
  );
  //const saveButtonHandler = () => {
  // let newASIN = true;
  //  selectedAsinsData.forEach((element) => {
  //    if (element.asin === addCompetInput) {
  //      newASIN = false;
  //    }
  //  });
  //  if (newASIN === true) {
  //    dispatch(
  //      createAsinTrackingData({
  //        asin: addCompetInput,
  //        parentAsin: parentAsin,
  //        store: store,
  //      })
  //    );
  //  }
  //};
  const saveButtonHandler = useCallback(() => {
    let newASIN = true;
    selectedAsinsData.forEach((element) => {
      if (element.asin === addCompetInput) {
        newASIN = false;
      }
    });
    if (newASIN) {
      dispatch(
        createAsinTrackingData({
          asin: addCompetInput,
          parentAsin: parentAsin,
          store: store,
        })
      );
    }
  }, [addCompetInput, dispatch, parentAsin, selectedAsinsData, store]);

  const [showAddCompetInput, setAddCompetInput] = useState(false);
  const handleAddCompetBtn = () => setAddCompetInput(true);

  return (
    <>
      {showAddCompetInput ? (
        <AddCompetInput
          autoFocus
          value={addCompetInput}
          onChange={handleCompetInput}
          placeholder="Add a ASIN"
        />
      ) : (
        <AddCompetButton onClick={handleAddCompetBtn}>
          + Add Competitors
        </AddCompetButton>
      )}
      {addCompetInput && (
        <SaveCompetBtn variant="contained" onClick={saveButtonHandler}>
          Save
        </SaveCompetBtn>
      )}
    </>
  );
};

export default CompetitorsInput;
