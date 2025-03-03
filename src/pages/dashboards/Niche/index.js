import { Divider, Skeleton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/macro";

import TransitionAlerts from "../../../components/alerts/TransitionAlert";
import ResultsContext from "../../../contexts/ResultsContext";

import Checks from "./components/Checks";
import Instructions from "./components/Instructions";
import Search from "./components/Search";

const TablesRecords = styled("div")`
  padding: 20px;
`;

const Gap = styled.div`
  height: ${(p) => p.height}px;
`;

function Niche({ onDrawerToggle }) {
  // const [open, setOpen] = useState([]);
  const { niche, nicheLoading, nicheErrorMessage } = useContext(ResultsContext);
  const [nicheData, setNicheData] = useState([]);
  useEffect(() => {
    if (niche && Array.isArray(niche)) {
      niche.forEach((n) => {
        if (n.name) {
          setNicheData((previous) => [...previous, n]);
        }
      });
    } else {
      setNicheData([]);
    }
  }, [niche]);

  // useEffect(() => {
  //   setOpen(nicheData.map((_el) => true));
  // }, [nicheData, open]);

  const sendEmailCheck = true;
  const [alertData, setAlertData] = useState({
    errorAlert: false,
    successAlert: false,
    messageSuccess: "",
    messageFailure: "",
  });

  useEffect(() => {
    if (nicheErrorMessage !== null) {
      setAlertData({
        errorAlert: true,
        successAlert: false,
        messageSuccess: "",
        messageFailure: nicheErrorMessage,
      });
    }
  }, [nicheErrorMessage]);

  const [updateNicheCheck, setUpdateNicheCheck] = useState(false);
  const handleUpdateNicheCheckbox = (event) =>
    setUpdateNicheCheck(event.target.checked);

  return (
    <React.Fragment>
      <Instructions />
      <Gap height={10} />
      <Checks
        sendEmailCheck={sendEmailCheck}
        updateNicheCheck={updateNicheCheck}
        handleUpdateNicheCheckbox={handleUpdateNicheCheckbox}
      />
      <Gap height={5} />
      <Divider />
      <Gap height={20} />
      <Search
        onDrawerToggle={onDrawerToggle}
        updateNicheCheck={updateNicheCheck}
      />
      <TablesRecords>
        {nicheLoading && (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Skeleton
                key={item}
                width={"100%"}
                sx={{ mt: 5, ml: 5 }}
                variant="rectangular"
                height={15}
              />
            ))}
          </>
        )}
        {nicheData.length
          ? nicheData.map((d_niche, idx) => {
              let name = d_niche.name;
              let data = d_niche;
              return data ? (
                <div key={idx}>Finished scraping data for "{name}"</div>
              ) : (
                <div key={idx}>No niche data found for "{d_niche.name}"</div>
              );
            })
          : null}
      </TablesRecords>
      <TransitionAlerts alert={alertData} />
    </React.Fragment>
  );
}
export default Niche;
