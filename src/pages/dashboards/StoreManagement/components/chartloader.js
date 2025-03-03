import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HorizontalBars = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  overflow-x: auto;
`;
export const ChartLoader = ({ max }) => {
  const maxValue = max ? max : 400;
  const [height, setHeight] = useState([]);
  useEffect(() => {
    let max = maxValue;
    let min = 200;
    let randomList = [];
    for (let i = 0; i <= 18; i++) {
      randomList.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setHeight(randomList);
  }, [maxValue]);

  return (
    <React.Fragment>
      <HorizontalBars>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
          (item) => (
            <Skeleton
              key={item}
              width={50}
              sx={{ mt: 5, ml: 3, mr: 3 }}
              variant="rectangular"
              height={height[item - 1]}
            />
          )
        )}
      </HorizontalBars>
    </React.Fragment>
  );
};
