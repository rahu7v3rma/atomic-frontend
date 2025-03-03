import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import styled from "styled-components/macro";

const Expand = styled("div")`
  float: right;
`;

const ExpandMoreIconStyled = styled(ExpandMoreIcon)`
  margin-left: 0px;
`;

function ExpandableSection({ idx, open, setOpen }) {
  const handleExpand = (idx, state) => {
    const openList = [...open];
    openList[idx] = state;
    setOpen(openList);
  };

  return (
    <Expand>
      {open[idx] ? (
        <ExpandLessIcon
          onClick={() => {
            handleExpand(idx, false);
          }}
        />
      ) : (
        <ExpandMoreIconStyled
          onClick={() => {
            handleExpand(idx, true);
          }}
        />
      )}
    </Expand>
  );
}

export default ExpandableSection;
