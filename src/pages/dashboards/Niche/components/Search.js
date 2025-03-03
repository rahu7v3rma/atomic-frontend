import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { appConfig } from "../../../../config";
import ResultsContext from "../../../../contexts/ResultsContext";
import { clearNiche, fetchNiche } from "../../../../redux/slices/niche";
import MultipleInputBoxes from "../../../components/MultipleInputBoxes";

// import the useDispatch Redux hook

// import our fetchNiche thunk

// for local testing
// import nicheData from "../../pages/dashboards/Brand/data/ExampleNiche";

const SubmitButton = styled(Button)`
  margin-left: 20px;
  background-color: #ddfce8;
  border-radius: 20px;
  color: #198843;
  font-weight: 800;
  font-family: "Inter", sans-serif;
  padding: 5px 25px;
  margin-top: 20px;

  &:hover {
    color: white;
  }
`;

const Search = (props) => {
  const { onDrawerToggle, updateNicheCheck } = props;
  // const navigate = useNavigate();
  const [nichesList, setNichesList] = useState([{ niche: "", status: null }]);
  const { niche, nicheErrorMessage, nicheLoading, brand } =
    useContext(ResultsContext);

  const max_niches = appConfig.max_niches;

  const dispatch = useDispatch();
  const [nicheData, setNicheData] = useState([]);
  const [nicheMessage, setNicheMessage] = useState([]);

  async function search() {
    setNicheData([]);
    setNicheMessage([]);
    dispatch(clearNiche());
    setNichesList((nl) => {
      let _nl = nl.map((n) => {
        n.status = "Fetching..";
        n.message = null;
        return n;
      });
      return _nl;
    });
    const niches = nichesList
      .filter(
        (item) =>
          item.niche &&
          typeof item.niche === "string" &&
          item.niche.trim() !== ""
      )
      .map((item) => item.niche.trim().toLowerCase());
    dispatch(fetchNiche(niches, brand?.brand_name, updateNicheCheck));
    setNicheData([]);
  }
  useEffect(() => {
    if (nicheMessage?.length > 0) {
      nicheMessage?.forEach((n) => {
        if (nichesList.find((nl) => n.includes(nl?.niche?.toLowerCase()))) {
          setNichesList((nlp) => {
            let _nlp = nlp?.map((_n) => {
              if (_n?.niche?.toLowerCase()) {
                _n.status = "Fetch Complete";
                _n.message = n;
              }
              return _n;
            });
            return _nlp;
          });
        }
      });
    }
    if (nicheData.length > 0) {
      nicheData.forEach((n) => {
        if (
          nichesList.find(
            (nl) => nl.niche?.toLowerCase() === n.name?.toLowerCase()
          )
        ) {
          setNichesList((nlp) => {
            let _nlp = nlp?.map((_n) => {
              if (_n?.niche?.toLowerCase() === n?.name?.toLowerCase()) {
                _n.status = "Fetch Complete";
                _n.message = n.message;
              }
              return _n;
            });
            return _nlp;
          });
        }
      });
    }
    // eslint-disable-next-line
  }, [nicheData,nicheMessage]);
  useEffect(() => {
    if (niche && Array.isArray(niche)) {
      niche.forEach((n) => {
        if (n.name) {
          setNicheData((previous) => [...previous, n]);
        } else {
          setNicheMessage((prev) => [...prev, n.message || n.error]);
        }
      });
    }
  }, [niche]);
  const handleSubmit = () => {
    if (nichesList[0].niche) {
      search();
    }
  };

  return (
    <>
      <MultipleInputBoxes
        onDrawerToggle={onDrawerToggle}
        name="niche"
        search={search}
        max_inputs={max_niches}
        inputsList={nichesList}
        setInputsList={setNichesList}
        placeholder="Search Niche..."
        inputErrorMessage={nicheErrorMessage}
      />
      <SubmitButton
        variant="contained"
        onClick={handleSubmit}
        color="success"
        disabled={nicheLoading}
      >
        SUBMIT
      </SubmitButton>
    </>
  );
};

export default Search;
