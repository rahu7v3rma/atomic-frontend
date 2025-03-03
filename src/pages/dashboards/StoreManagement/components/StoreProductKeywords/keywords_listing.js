import { Box, Container } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

import ListingTable from "./ListingTable";

const LockKeyIcon = "./assets/lockkey.png";

const KeyWords = styled.div`
  margin-left: 12px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #0f172a;
`;

const KeyWordsView = styled(Container)`
  display: flex;
  align-items: flex-start;
  margin-left: 0;
`;

const IconView = styled.div`
  background-color: #0d9488;
  width: 24px;
  height: 24px;
  padding: 5px;
  border-radius: 4px;
`;

const KeyIcon = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const KeywordsListing = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 6,
        backgroundColor: "#ffffff",
      }}
    >
      <KeyWordsView>
        <IconView>
          <KeyIcon src={LockKeyIcon} />
        </IconView>
        <Box>
          <KeyWords>Keywords</KeyWords>
        </Box>
      </KeyWordsView>
      <ListingTable />
    </Box>
  );
};

export default KeywordsListing;
